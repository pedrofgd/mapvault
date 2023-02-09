using System.Net;
using MapVault.Dtos;
using MapVault.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

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

      _logger.LogInformation("CountNotesController has been started");
   }

   [HttpGet]
   [Route("notes/count")]
   [ProducesResponseType(typeof(CountNotesResponseDto), (int)HttpStatusCode.OK)]
   public async Task<IActionResult> CountNotes(CancellationToken cancellationToken)
   {
      var total = await _notesRepository.CountNotes(cancellationToken);
      
      _logger.LogInformation("CountNotes run successfully");
      return Ok(new CountNotesResponseDto {Total = total});
   }
}