using MapVault.Dtos;
using MapVault.Http.HighlightMessage;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

[ApiController]
[Route("api/v1")]
public class GetValuableFromExceptionMessageController : ControllerBase
{
    private readonly ILogger<GetValuableFromExceptionMessageController> _logger;
    private readonly IHighlightMessageClient _highlightMessageClient;

    public GetValuableFromExceptionMessageController(
        ILogger<GetValuableFromExceptionMessageController> logger,
        IHighlightMessageClient highlightMessageClient)
    {
        _logger = logger;
        _highlightMessageClient = highlightMessageClient;
        
        _logger.LogInformation("GetValuableFromExceptionMessage has been started");
    }
    
    [HttpPost]
    [Route("highlight")]
    public async Task<IActionResult> GetValuableFromMessage([FromBody] HighlightMessageRequestDto request)
    {
        var valuables = await _highlightMessageClient.GetValuableFragments(request.Message);
        
        _logger.LogInformation("GetValuableFromMessage run successfully");
        return Ok(new HighlightMessageResponseDto { ValuableFragments = valuables });
    }
}