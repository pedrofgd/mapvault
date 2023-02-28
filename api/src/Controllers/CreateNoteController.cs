using MapVault.Dtos;
using MapVault.Models;
using MapVault.Repositories;
using MapVault.Utils;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MapVault.Controllers;

[ApiController]
[Route("api/v1")]
public class CreateNoteController : ControllerBase
{
   private readonly ILogger<CreateNoteController> _logger;
   private readonly INotesRepository _notesRepository;
   private readonly HighlightExceptionMessage _highlightExceptionMessage;

   public CreateNoteController(
      ILogger<CreateNoteController> logger,
      INotesRepository notesRepository,
      HighlightExceptionMessage highlightExceptionMessage)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _notesRepository = notesRepository ?? throw new ArgumentNullException(nameof(notesRepository));
      _highlightExceptionMessage = highlightExceptionMessage;

      _logger.LogInformation("CreateNoteController has been started");
   }

   [HttpPost]
   [Route("notes/create")]
   public async Task<IActionResult> CreateNote([FromBody] CreateNoteRequestDto request, CancellationToken cancellationToken)
   {
      var note = new Note(
         request.Title, 
         request.Categories,
         request.Description,
         request.ExceptionMessage,
         request.Content);
      
      var createResult = await _notesRepository.SaveOrUpdateAsync(note, cancellationToken);
      if (createResult is false)
      {
         _logger.LogError("Couldn't create note for id {Id} and title {Title}", note.Id, note.Title);
         return BadRequest(new DefaultErrorResponse($"Couldn't create note for id {note.Id}"));
      }

      _logger.LogInformation("CreateNote run successfully for id {Id}", note.Id);

      if (request.HighlightMessage && note.ExceptionMessage.Message != null)
      {
#pragma warning disable CS4014
         // Fire-and-forget
         _highlightExceptionMessage.Highlight(note.Id, note.ExceptionMessage.Message);
#pragma warning restore CS4014
      }

      return Ok(note);
   }
}