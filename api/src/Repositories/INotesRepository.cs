using MapVault.Models;
using MapVault.QueryModels;

namespace MapVault.Repositories;

public interface INotesRepository
{
   void CreateNote(Note note, CancellationToken cancellationToken = default);
   Task<UpdateNoteResult> UpdateNote(Note editedNote, CancellationToken cancellationToken = default);
   Task<long> CountNotes(CancellationToken cancellationToken = default);
   Task<List<FilteredNoteQueryDto>> GetNotes(CancellationToken cancellationToken = default);
   Task<Note?> GetNoteById(Guid id, CancellationToken cancellationToken = default);
   Task DeleteNote(Guid id, CancellationToken cancellationToken = default);
}