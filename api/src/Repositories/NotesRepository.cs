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
      var customProjection = Builders<Note>.Projection.Expression(u =>
         new SummaryNoteQueryDto
         {
            Id = u.Id,
            Title = u.Title,
            Categories = u.Categories,
            Description = u.Description,
            ExceptionMessage = u.ExceptionMessage.Message
         });
      
      try
      {
         return await Collection
            .Find(new BsonDocument())
            .Project(customProjection)
            .ToListAsync(cancellationToken: cancellationToken);
      }
      catch (Exception e)
      {
         _logger.LogError("Couldn't get summary notes. Error: {ExceptionMessage}", e.Message);
         return null;
      }
   }

    public async Task<List<string>> SearchNotesByTitle(string title, 
        CancellationToken cancellationToken)
    {
        var filter = Builders<Note>.Filter.Regex(field => field.Title, 
           new BsonRegularExpression($"{title}", "i"));
        var cursor = await Collection.FindAsync(filter, 
            cancellationToken: cancellationToken);
        var list = cursor.ToList(cancellationToken: cancellationToken);

        return !list.Any() ? new List<string>() : list.Select(x => x.Title).ToList()!;
    }

   public async Task<SummaryNoteQueryDto> GetSummaryNoteByAlias(string alias,
        CancellationToken cancellationToken)
   {
        var filter = Builders<Note>.Filter.Eq(note => note.Alias, alias);
        var customProjection = Builders<Note>.Projection.Expression(u =>
            new SummaryNoteQueryDto
            {
                Id = u.Id,
                Title = u.Title,
                Categories = u.Categories,
                Description = u.Description,
                ExceptionMessage = u.ExceptionMessage.Message
            });

        return await Collection
            .Find(filter)
            .Project(customProjection)
            .SingleOrDefaultAsync(cancellationToken: cancellationToken);
   }
}
