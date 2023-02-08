using MapVault.Dtos;
using MapVault.Models;
using MapVault.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

[ApiController]
[Route("api/v1")]
public class CreateNoteController : ControllerBase
{
   private readonly ILogger<CreateNoteController> _logger;
   private readonly INotesRepository _notesRepository;

   public CreateNoteController(
      ILogger<CreateNoteController> logger,
      INotesRepository notesRepository)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _notesRepository = notesRepository ?? throw new ArgumentNullException(nameof(notesRepository));

      _logger.LogInformation("CreateNoteController has been started");
   }

   [HttpPost]
   [Route("notes/create")]
   public IActionResult CreateNote([FromBody] CreateNoteRequestDto request,
      CancellationToken cancellationToken)
   {
      var note = new Note(
         request.Title, 
         request.Categories, 
         request.ExceptionMessage, 
         request.Content);
      
      _notesRepository.CreateNote(note, cancellationToken);

      return Ok();
   }
}