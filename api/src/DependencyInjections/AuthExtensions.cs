using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;

namespace MapVault.DependencyInjections;

public static class AuthExtensions
{
    public static void AddAuth(this IServiceCollection services,
        IConfiguration configuration)
    {
        services
            .AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie("Cookies", options =>
            {
                options.LoginPath = "api/login";
                options.SlidingExpiration = true; // todo: not working
                options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
                
                options.Events.OnRedirectToLogin = context =>
                {
                    context.HttpContext.SignOutAsync("Cookies");
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            })
            .AddJwtBearer("Bearer", options =>
            {
                options.Authority = "https://accounts.google.com";
                options.Audience = configuration["Authentication:Google:ClientId"];
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "https://accounts.google.com",
                    ValidAudience = configuration["Authentication:Google:ClientId"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Authentication:Google:ClientSecret"]))
                };
            })
            .AddGoogle(googleOptions =>
            {
                googleOptions.ClientId = configuration["Authentication:Google:ClientId"];
                googleOptions.ClientSecret = configuration["Authentication:Google:ClientSecret"];
                googleOptions.SaveTokens = true;
            });
    }

    private static AuthenticationBuilder AddGoogleAuth(this AuthenticationBuilder builder,
        IConfiguration configuration)
    {
        var googleClientId = configuration["Authentication:Google:ClientId"];
        var googleClientSecret = configuration["Authentication:Google:ClientSecret"];

        ArgumentException.ThrowIfNullOrEmpty(googleClientId);
        ArgumentException.ThrowIfNullOrEmpty(googleClientSecret);

        builder
            .AddGoogle(googleOptions =>
            {
                googleOptions.ClientId = googleClientId;
                googleOptions.ClientSecret = googleClientSecret;
            });

        return builder;
    }
}