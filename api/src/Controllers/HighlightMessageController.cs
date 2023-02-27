using MapVault.Dtos;
using MapVault.Http.HighlightMessage;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

[ApiController]
[Route("api/v1")]
public class HighlightMessageController : ControllerBase
{
    private readonly IHighlightMessageClient _highlightMessageClient;

    public HighlightMessageController(
        IHighlightMessageClient highlightMessageClient)
    {
        _highlightMessageClient = highlightMessageClient;
    }
    
    [HttpPost]
    [Route("highlight")]
    public async Task<IActionResult> HighlightMessage([FromBody] HighlightMessageRequestDto request)
    {
        var valuables = await _highlightMessageClient.GetValuableFragments(request.Message);
        
        return Ok(new HighlightMessageResponseDto { ValuableFragments = valuables });
    }
}