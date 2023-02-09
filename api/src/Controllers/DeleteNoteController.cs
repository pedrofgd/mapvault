using MapVault.Dtos;
using MapVault.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

[ApiController]
[Route("api/v1")]
public class DeleteNoteController : ControllerBase
{
   private readonly ILogger<DeleteNoteController> _logger;
   private readonly INotesRepository _notesRepository;

   public DeleteNoteController(
      ILogger<DeleteNoteController> logger,
      INotesRepository notesRepository)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _notesRepository = notesRepository ?? throw new ArgumentNullException(nameof(notesRepository));

      _logger.LogInformation("DeleteNoteController has been started");
   }

   [HttpDelete]
   [Route("notes/{id}")]
   public async Task<IActionResult> DeleteNote(Guid id, CancellationToken cancellationToken) 
   {      
      var deleteResult = await _notesRepository.DeleteByIdAsync(id, cancellationToken);
      if (deleteResult is false)
      {
         _logger.LogError("Couldn't delete note for id {Id}", id);
         return BadRequest(new DefaultErrorResponse($"Couldn't delete note. The informed Id may not exists"));
      }
      
      _logger.LogInformation("DeleteNote run successfully for id {Id}", id);
      return Ok();
   }
}