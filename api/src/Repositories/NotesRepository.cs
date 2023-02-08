using MapVault.Data.MongoDb;
using MapVault.Models;
using MapVault.QueryModels;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MapVault.Repositories;

public class NotesRepository : INotesRepository
{
   private readonly IMongoCollection<Note> _notesCollection;
   private readonly ILogger<NotesRepository> _logger;

   public NotesRepository(
      ILogger<NotesRepository> logger)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      
      var mongoDatabase = MongoDbConnectionFactory.GetMongoDatabase();
      _notesCollection = mongoDatabase.GetCollection<Note>(CollectionConstants.NotesCollection);
   }

   public void CreateNote(Note note, CancellationToken cancellationToken = default)
   {
      try
      {
         _notesCollection.InsertOne(note, cancellationToken: cancellationToken);
      } catch (Exception) {
         _logger.LogError("Error while creating note");
         throw;
      }
   }

   public async Task<UpdateNoteResult> UpdateNote(Note editedNote, CancellationToken cancellationToken = default)
   {
      try
      {
         var replaceOneResult = await _notesCollection
            .ReplaceOneAsync(
               doc => doc.Id == editedNote.Id, 
               editedNote, 
               cancellationToken: cancellationToken);
         return new UpdateNoteResult
         {
            Updated = replaceOneResult.ModifiedCount == 1
         };
      } catch(Exception) {
         _logger.LogError("Error while updating note");
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
            .Exclude(doc => doc.Content)
            .Exclude(doc => doc.CreatedAt)
            .Exclude(doc => doc.ModifiedAt);

         return await _notesCollection
            .Find(new BsonDocument())
            .Project<FilteredNoteQueryDto>(projectFields)
            .ToListAsync(cancellationToken: cancellationToken);
      } catch (Exception) {
         _logger.LogError("Error while getting notes");
         throw;
      }
   }

   public async Task<Note?> GetNoteById(Guid id, CancellationToken cancellationToken)
   {
      try
      {
         var filter = Builders<Note>.Filter.Eq(x => x.Id, id);

         return await _notesCollection
            .Find(filter)
            .FirstOrDefaultAsync(cancellationToken: cancellationToken);
      } catch (Exception) {
         _logger.LogError("Error while getting notes with id {Id}", id);
         throw;
      }
   }

   public async Task DeleteNote(Guid id, CancellationToken cancellationToken = default)
   {
      try
      {
         var deleteFilter = Builders<Note>.Filter.Eq(x => x.Id, id);
         await _notesCollection.DeleteOneAsync(deleteFilter, cancellationToken);
      } catch (Exception) {
         _logger.LogError("Error while deleting note with id {Id}", id);
         throw;
      }
   }
}