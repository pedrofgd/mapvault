using MapVault.Dtos;
using MapVault.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MapVault.Controllers;

[ApiController]
[Route("api/v1")]
public class CreateRemarkController : ControllerBase
{
    private readonly ILogger<CreateRemarkController> _logger;
    private readonly INotesRepository _notesRepository;

    public CreateRemarkController(
        ILogger<CreateRemarkController> logger,
        INotesRepository notesRepository)
    {
        _logger = logger;
        _notesRepository = notesRepository;

        _logger.LogInformation("CreateRemarkController has been started");
    }

    [HttpPost]
    [Route("remarks/create")]
    public async Task<IActionResult> CreateRemark(
        [FromBody] CreateRemarkRequestDto request,
        CancellationToken cancellationToken)
    {
        var note = await _notesRepository.GetByIdAsync(request.NoteId,
            cancellationToken);
        if (note is null)
        {
            _logger.LogWarning("Note with id {NoteId} does not exists",
                request.NoteId);
            return NotFound();
        }

        if (string.IsNullOrWhiteSpace(request.Remark))
        {
            _logger.LogWarning("Remark is not valid for note with id {NoteId}",
                request.NoteId);
            return BadRequest();
        }

        note.AddRemark(request.Remark);

        await _notesRepository.SaveOrUpdateAsync(note, cancellationToken);

        return Ok();
    }
}