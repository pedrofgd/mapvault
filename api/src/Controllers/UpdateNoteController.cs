using MapVault.Dtos;
using MapVault.Repositories;
using MapVault.Utils;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

[ApiController]
[Route("api/v1")]
public class UpdateNoteController : ControllerBase
{
   private readonly ILogger<GetNotesController> _logger;
   private readonly INotesRepository _notesRepository;
   private readonly HighlightExceptionMessage _highlightExceptionMessage;

   public UpdateNoteController(
      ILogger<GetNotesController> logger,
      INotesRepository repository,
      HighlightExceptionMessage highlightExceptionMessage)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _notesRepository = repository ?? throw new ArgumentNullException(nameof(repository));
      _highlightExceptionMessage = highlightExceptionMessage ?? throw new ArgumentNullException(nameof(highlightExceptionMessage));

      _logger.LogInformation("UpdateNoteController has been started");
   }

   [HttpPut]
   [Route("notes")]
   public async Task<IActionResult> UpdateNote([FromBody] UpdateNoteRequestDto request, CancellationToken cancellationToken)
   {
      var note = await _notesRepository.GetByIdAsync(request.Id, cancellationToken);
      if (note is null)
      {
         _logger.LogError("Note not found for Id {Id}", request.Id);
         return NotFound();
      }

      note.Update(request.Title, request.Categories, request.Description,
         request.ExceptionMessage, request.Content);

      var updateResult = await _notesRepository.SaveOrUpdateAsync(note, cancellationToken);
      if (updateResult is false)
      {
         _logger.LogError("Couldn't update note with id {Id}", note.Id);
         return BadRequest(new DefaultErrorResponse("Couldn't update note. The informed Id may not exists"));
      }

      _logger.LogInformation("UpdateNote run successfully for id {Id}", note.Id);
      
      if (request.HighlightMessage && note.ExceptionMessage.Message != null)
      {
#pragma warning disable CS4014
         // Fire-and-forget
         _highlightExceptionMessage.Highlight(note.Id, note.ExceptionMessage.Message);
#pragma warning restore CS4014
      }
      else
      {
         note.ResetExceptionMessageHighlights();
      }
      
      return Ok(note);
   }
}