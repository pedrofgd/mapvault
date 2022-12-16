using Dtos;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;

namespace Controllers;

[ApiController]
[Route("api/v1")]
public class CreateNoteController : ControllerBase
{
   private readonly ILogger<CreateNoteController> _logger;
   private readonly IConfiguration _configuration;
   private readonly INotesRepository _notesRepository;

   public CreateNoteController(
      ILogger<CreateNoteController> logger,
      IConfiguration configuration,
      INotesRepository notesRepository)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
      _notesRepository = notesRepository ?? throw new ArgumentNullException(nameof(notesRepository));

      _logger.LogInformation("CreateNoteController has been started");
   }

   [HttpPost]
   [Route("notes/create")]
   public IActionResult CreateNote([FromBody] CreateNoteRequestDto request,
      CancellationToken cancellationToken)
   {
      var note = new Note(
         Guid.NewGuid(), 
         request.Title, 
         request.Categories, 
         request.ExceptionMessage, 
         request.Content);
      
      _notesRepository.CreateNote(note, cancellationToken);

      return Ok();
   }
}