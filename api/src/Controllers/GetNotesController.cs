using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Repositories;

namespace Controllers;

[ApiController]
[Route("api/v1")]
public class GetNotesController : ControllerBase
{
   private readonly ILogger<GetNotesController> _logger;
   private readonly INotesRepository _notesRepository;

   public GetNotesController(
      ILogger<GetNotesController> logger,
      INotesRepository repository)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _notesRepository = repository ?? throw new ArgumentNullException(nameof(repository));

      _logger.LogInformation("GetNotesController has been initialized");
   }

   [HttpGet]
   [Route("notes")]
   public async Task<IActionResult> GetNotes(CancellationToken cancellationToken = default)
   {
      var notes = await _notesRepository.GetNotes(cancellationToken);
      return Ok(notes);
   }
}