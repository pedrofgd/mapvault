using System.Net;
using Dtos;
using Microsoft.AspNetCore.Mvc;
using Repositories;

namespace Controllers;

[ApiController]
[Route("api/v1")]
public class CountNotesController : ControllerBase
{
   private readonly ILogger<CountNotesController> _logger;
   private readonly INotesRepository _notesRepository;

   public CountNotesController(
      ILogger<CountNotesController> logger,
      INotesRepository notesRepository)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _notesRepository = notesRepository ?? throw new ArgumentNullException(nameof(notesRepository));

      _logger.LogInformation("CountNotesController has been initializaed");
   }

   [HttpGet]
   [Route("notes/count")]
   [ProducesResponseType(typeof(CountNotesResponseDto), (int)HttpStatusCode.OK)]
   public async Task<IActionResult> CountNotes(CancellationToken cancellationToken)
   {
      var total = await _notesRepository.CountNotes(cancellationToken);
      return Ok(new CountNotesResponseDto {Total = total});
   }
}