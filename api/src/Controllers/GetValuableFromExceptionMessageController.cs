using MapVault.Dtos;
using MapVault.Http.HighlightMessage;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

[ApiController]
[Route("api/v1")]
public class GetValuableFromExceptionMessageController : ControllerBase
{
    private readonly IHighlightMessageClient _highlightMessageClient;
    private readonly ILogger<GetValuableFromExceptionMessageController> _logger;

    public GetValuableFromExceptionMessageController(
        ILogger<GetValuableFromExceptionMessageController> logger,
        IHighlightMessageClient highlightMessageClient)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _highlightMessageClient =
            highlightMessageClient ?? throw new ArgumentNullException(nameof(highlightMessageClient));

        _logger.LogInformation("GetValuableFromExceptionMessageController has been started");
    }

    [HttpGet]
    [Route("highlight")]
    public async Task<IActionResult> GetValuableFromMessage([FromBody] HighlightMessageRequestDto request)
    {
        var valuables = await _highlightMessageClient.GetValuableFragments(request.Message);

        _logger.LogInformation("GetValuableFromMessage run successfully");
        return Ok(new HighlightMessageResponseDto { ValuableFragments = valuables });
    }
}