using MapVault.Models;
using MapVault.QueryModels;

namespace MapVault.Repositories;

public interface INotesRepository
{
   Task<Note?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
   Task<bool> SaveOrUpdateAsync(Note editedNote, CancellationToken cancellationToken);
   Task<bool> DeleteByIdAsync(Guid id, CancellationToken cancellationToken);

   Task<long> CountNotes(CancellationToken cancellationToken);
   Task<List<SummaryNoteQueryDto>?> GetAllSummaryNotes(CancellationToken cancellationToken);
}