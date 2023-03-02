using System.Diagnostics;
using MapVault.Http.HighlightMessage;
using MapVault.Repositories;

namespace MapVault.Utils;

public class HighlightExceptionMessage
{
    private readonly ILogger<HighlightExceptionMessage> _logger;
    private readonly IHighlightMessageClient _highlightMessageClient;
    private readonly INotesRepository _notesRepository;

    public HighlightExceptionMessage(
        ILogger<HighlightExceptionMessage> logger,
        IHighlightMessageClient highlightMessageClient,
        INotesRepository notesRepository)
    {
        _logger = logger;
        _highlightMessageClient = highlightMessageClient;
        _notesRepository = notesRepository;
    }

    public async Task Highlight(Guid noteId, string message)
    {
        var watch = Stopwatch.StartNew();
        _logger.LogInformation("Starting highlight exception message for note {NoteId}", noteId);

        try
        {
            var note = await _notesRepository.GetByIdAsync(noteId, CancellationToken.None);
            if (note is null)
            {
                _logger.LogWarning(
                    "Note does not exists while trying to highlight exception message for note {NoteId}",
                    noteId);
                return;
            }

            var valuables = await _highlightMessageClient.GetValuableFragments(message);
            if (!valuables.Any())
            {
                _logger.LogWarning("Couldn't get valuable fragments from exception message for note {NoteId}", noteId);
                return;
            }

            note.HighlightExceptionMessage(valuables);

            await _notesRepository.SaveOrUpdateAsync(note, CancellationToken.None);
        }
        catch (Exception e)
        {
            _logger.LogError(
                "An error occurred while trying to highlight exception message for note {NoteId} " +
                "Erro: {Message}",
                noteId, e.Message);
            return;
        }

        watch.Stop();
        _logger.LogInformation(
            "Highlight exception message for note {NoteId} successfully finished. " +
            "ElapsedMilliseconds: {ElapsedMilliseconds}",
            noteId, watch.ElapsedMilliseconds);
    }
}