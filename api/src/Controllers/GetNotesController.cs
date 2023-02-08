using MapVault.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

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

   [HttpGet]
   [Route("notes/{id}")]
   public async Task<IActionResult> GetNoteById(Guid id, CancellationToken cancellationToken)
   {
      var note = await _notesRepository.GetNoteById(id, cancellationToken);
      if (note is null) 
         return NotFound();

      return Ok(note);
   }
}