using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace MapVault.Controllers;

[Route("api")]
public class AuthenticationController : Controller
{
    private readonly ILogger<AuthenticationController> _logger;
    private readonly IConfiguration _configuration;

    public AuthenticationController(
        ILogger<AuthenticationController> logger,
        IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;

        _logger.LogInformation("Reached");
    }
    
    [AllowAnonymous]
    [HttpGet("login")]
    public IActionResult GoogleLogin()
    {
        _logger.LogInformation("GoogleLogin");
        var properties = new AuthenticationProperties { RedirectUri = "http://localhost:5149/api/callback" };
        return Challenge(properties, GoogleDefaults.AuthenticationScheme);
    }

    [Authorize(AuthenticationSchemes = "Cookies,Bearer")]
    [HttpGet("callback")]
    public async Task<IActionResult> GoogleCallback()
    {
        _logger.LogInformation("GoogleCallback");
        
        var authenticateResult = await HttpContext.AuthenticateAsync("Cookies");
        if (!authenticateResult.Succeeded)
        {
            await HttpContext.SignOutAsync("Cookies");
            return Unauthorized();
        }

        var accessToken = await HttpContext.GetTokenAsync("access_token");
        _logger.LogInformation(accessToken);

        var idToken = await HttpContext.GetTokenAsync("Google", "id_token");
        _logger.LogInformation(idToken);

        var claims = User.Claims.Select(x => new { x.Type, x.Value });
        
        // Authenticate user and retrieve user identity
        var identity = new ClaimsIdentity("Cookies");
        // ...

        var nameIdentifier = claims
            .FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")
            .Value;
        var email = claims
            .FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")
            .Value;
        
        // Build token claims
        var claimsToken = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, nameIdentifier),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("email", email)
        };

        // Load signing key from configuration
        var secret = _configuration.GetValue<string>("Authentication:Jwt:Secret");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

        // Build and sign token
        var token = new JwtSecurityToken(
            issuer: _configuration.GetValue<string>("Authentication:Jwt:Issuer"),
            audience: _configuration.GetValue<string>("Authentication:Jwt:Audience"),
            claims: claimsToken,
            expires: DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("Authentication:Jwt:ExpirationMinutes")),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

        return Ok(new { Provider = User.Identity?.AuthenticationType, accessToken, claims, encodedToken });
    }

    [HttpGet("logout")]
    public async Task Logout()
    {
        _logger.LogInformation("Logout");
        await HttpContext.SignOutAsync("Cookies");
    }
}