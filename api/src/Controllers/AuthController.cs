using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

[Route("api")]
public class AuthenticationController : Controller
{
    private readonly ILogger<AuthenticationController> _logger;

    public AuthenticationController(
        ILogger<AuthenticationController> logger)
    {
        _logger = logger;
        
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

    [Authorize]
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

        return Ok(new { Provider = User.Identity?.AuthenticationType, accessToken, claims });
    }

    [HttpGet("logout")]
    public async Task Logout()
    {
        _logger.LogInformation("Logout");
        await HttpContext.SignOutAsync(JwtBearerDefaults.AuthenticationScheme);
    }
}