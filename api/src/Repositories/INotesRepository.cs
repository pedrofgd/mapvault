using Models;

namespace Repositories;

public interface INotesRepository
{
   void CreateNote(Note note, CancellationToken cancellationToken = default);
   Task<long> CountNotes(CancellationToken cancellationToken = default);
}