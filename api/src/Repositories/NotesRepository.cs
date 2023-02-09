using MapVault.Data.MongoDb;
using MapVault.Models;
using MapVault.QueryModels;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MapVault.Repositories;

public class NotesRepository : RepositoryBase<Note>, INotesRepository
{
   private readonly IMongoCollection<Note> _notesCollection;
   private readonly ILogger<NotesRepository> _logger;

   public NotesRepository(ILogger<NotesRepository> logger) : 
      base(CollectionConstants.NotesCollection)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      
      var mongoDatabase = MongoDbConnectionFactory.GetMongoDatabase();
      _notesCollection = mongoDatabase.GetCollection<Note>(CollectionConstants.NotesCollection);
   }
   
   public async Task<long> CountNotes(CancellationToken cancellationToken)
   {
      return await _notesCollection.CountDocumentsAsync(_ => true, cancellationToken: cancellationToken);
   }

   public async Task<List<SummaryNoteQueryDto>?> GetAllSummaryNotes(CancellationToken cancellationToken)
   {
      var projectionDefinition = Builders<Note>.Projection
         .Include(doc => doc.Id)
         .Include(doc => doc.Title)
         .Include(doc => doc.Categories)
         .Include(doc => doc.ExceptionMessage);

      try
      {
         return await _notesCollection
            .Find(new BsonDocument())
            .Project<SummaryNoteQueryDto>(projectionDefinition)
            .ToListAsync(cancellationToken: cancellationToken);
      }
      catch (Exception e)
      {
         _logger.LogError("Couldn't get summary notes. Error: {ExceptionMessage}", e.Message);
         return null;
      }
   }
}