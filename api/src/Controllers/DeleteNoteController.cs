using Microsoft.AspNetCore.Mvc;
using Repositories;

namespace Controllers;

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
   public async Task<IActionResult> DeleteNote(Guid id, 
      CancellationToken cancellationToken) 
   {      
      await _notesRepository.DeleteNote(id, cancellationToken);

      return Ok();
   }
}