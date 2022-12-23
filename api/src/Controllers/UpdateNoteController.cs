using Dtos;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;

namespace Controllers;

[ApiController]
[Route("api/v1")]
public class UpdateNoteController : ControllerBase
{
   private readonly ILogger<GetNotesController> _logger;
   private readonly INotesRepository _notesRepository;

   public UpdateNoteController(
      ILogger<GetNotesController> logger,
      INotesRepository repository)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _notesRepository = repository ?? throw new ArgumentNullException(nameof(repository));

      _logger.LogInformation("UpdateNoteController has been initialized");
   }

   [HttpPut]
   [Route("notes")]
   public async Task<IActionResult> UpdateNote([FromBody] Note note)
   {
      var updateResult = await _notesRepository.UpdateNote(note);
      if (!updateResult.Updated)
      {
         _logger.LogWarning("Note could't be updated for received id {Id}", note.Id);
         return BadRequest(new DefaultErrorResponse {ErrorMessage = "Couldn't update note. Check if the informed id is from an existent note"});
      }

      return Ok();
   }
}