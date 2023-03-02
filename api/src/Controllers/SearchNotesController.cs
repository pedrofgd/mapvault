using MapVault.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

[ApiController]
[Route("api/v1")]
public class SearchController : ControllerBase
{
    private readonly ILogger<SearchController> _logger;
    private readonly INotesRepository _notesRepository;

    public SearchController(
        ILogger<SearchController> logger,
        INotesRepository repository)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _notesRepository = repository ?? throw new ArgumentNullException(nameof(repository));
        
        _logger.LogInformation("SearchController has been started");
    }
    
    [HttpGet]
    [Route("search/notes/{title}")]
    public async Task<IActionResult> SearchNotesByTitle(string title, CancellationToken cancellationToken)
    {
        var results = await _notesRepository.SearchNotesByTitle(title, cancellationToken);

        _logger.LogInformation("SearchNotesByTitle run successfully");
        return Ok(results);
    }
}