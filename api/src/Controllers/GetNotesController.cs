using MapVault.Dtos;
using MapVault.QueryModels;
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

      _logger.LogInformation("GetNotesController has been started");
   }

   [HttpGet]
   [Route("notes")]
   public async Task<IActionResult> GetAllNotes(CancellationToken cancellationToken = default)
   {
      var notes = await _notesRepository.GetAllSummaryNotes(cancellationToken);
      if (notes is null)
      {
         _logger.LogError("Couldn't ged all summary notes");
         return BadRequest(new DefaultErrorResponse("Couldn't get all summary notes"));
      }

      _logger.LogInformation("GetAllNotes run successfully");
      return Ok(notes);
   }

   [HttpGet]
   [Route("notes/{id:guid}")]
   public async Task<IActionResult> GetNoteById(Guid id, CancellationToken cancellationToken)
   {
      var note = await _notesRepository.GetByIdAsync(id, cancellationToken);
      if (note is null)
      {
         _logger.LogError("Note not found for id {Id}", id);
         return NotFound();
      }
      
      _logger.LogInformation("GetNoteById run successfully for id {Id}", id);
      return Ok(note);
   }
}