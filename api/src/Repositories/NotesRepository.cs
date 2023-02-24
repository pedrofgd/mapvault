using MapVault.Models;
using MapVault.QueryModels;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MapVault.Repositories;

public class NotesRepository : RepositoryBase<Note>, INotesRepository
{
   private readonly ILogger<NotesRepository> _logger;

   public NotesRepository(ILogger<NotesRepository> logger) : 
      base(CollectionConstants.NotesCollection)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
   }
   
   public async Task<long> CountNotes(CancellationToken cancellationToken)
   {
      return await Collection.CountDocumentsAsync(_ => true, cancellationToken: cancellationToken);
   }

   public async Task<List<SummaryNoteQueryDto>?> GetAllSummaryNotes(CancellationToken cancellationToken)
   {
      var projectionDefinition = Builders<Note>.Projection
         .Include(doc => doc.Id)
         .Include(doc => doc.Title)
         .Include(doc => doc.Categories)
         .Include(doc => doc.Description)
         .Include(doc => doc.ExceptionMessage);

      try
      {
         return await Collection
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

   public async Task<List<string>> SearchNotesByTitle(string title, CancellationToken cancellationToken)
   {
      var filter = Builders<Note>.Filter.Regex(field => field.Title, 
         new BsonRegularExpression($"{title}", "i"));
      var cursor = await Collection.FindAsync(filter, cancellationToken: cancellationToken);
      var list = cursor.ToList(cancellationToken: cancellationToken);
      
      return !list.Any() ? new List<string>() : list.Select(x => x.Title).ToList()!;
   }
}