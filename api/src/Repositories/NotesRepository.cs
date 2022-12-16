using Data;
using Models;
using MongoDB.Bson;
using MongoDB.Driver;
using QueryModels;

namespace Repositories;

public class NotesRepository : INotesRepository
{
   private readonly IMongoCollection<Note> _notesCollection;
   private readonly ILogger<NotesRepository> _logger;

   public NotesRepository(
      ILogger<NotesRepository> logger,
      DataContext dataContext)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));

      var db = dataContext.GetMongoDbConnection("mapvault");
      var collection = db.GetCollection<Note>("notes");
      _notesCollection = collection ?? throw new ArgumentNullException(nameof(collection));
   }

   public void CreateNote(Note note, CancellationToken cancellationToken = default)
   {
      try
      {
         _notesCollection.InsertOne(note);
      } catch (Exception) {
         _logger.LogError("Error while creating note");
         throw;
      }
   }

   public async Task<long> CountNotes(CancellationToken cancellationToken)
   {
      try
      {
         return await _notesCollection.CountDocumentsAsync(_ => true, cancellationToken: cancellationToken);
      } catch (Exception) {
         _logger.LogError("Error while couting notes");
         throw;
      }
   }

   public async Task<List<FilteredNoteQueryDto>> GetNotes(CancellationToken cancellationToken)
   {
      try
      {
         var projectFields = Builders<Note>.Projection
            .Exclude(doc => doc.Content);

         return await _notesCollection
            .Find(new BsonDocument())
            .Project<FilteredNoteQueryDto>(projectFields)
            .ToListAsync();
      } catch (Exception) {
         _logger.LogError("Error while getting notes");
         throw;
      }
   }

   public async Task<Note> GetNoteById(Guid id, CancellationToken cancellationToken)
   {
      try
      {
         var filter = Builders<Note>.Filter.Eq(x => x.Id, id);

         return await _notesCollection
            .Find(filter)
            .FirstOrDefaultAsync();
      } catch (Exception) {
         _logger.LogError("Error while getting notes with id {Id}", id);
         throw;
      }
   }
}