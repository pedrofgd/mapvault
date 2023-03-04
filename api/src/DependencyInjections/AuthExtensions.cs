using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
                options.DefaultScheme = "FrontEnd";
                options.DefaultSignInScheme = "Cookies";
            })
            .AddCookie("Cookies", options =>
            {
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
            .AddJwtBearer("FrontEnd", options =>
            {
                var jwtKey = configuration.GetValue<string>("Authentication:Jwt:Secret");
                var key = Encoding.ASCII.GetBytes(jwtKey);

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = configuration["Authentication:Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = configuration["Authentication:Jwt:Audience"],
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
                
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine(context.Exception);
                        return Task.CompletedTask;
                    }
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