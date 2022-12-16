using Data;
using Models;
using MongoDB.Driver;

namespace Repositories;

public class NotesRepository : INotesRepository
{
   private readonly IMongoCollection<Note> _db;
   private readonly ILogger<NotesRepository> _logger;

   public NotesRepository(
      ILogger<NotesRepository> logger,
      DataContext dataContext)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));

      var db = dataContext.GetMongoDbConnection("mapvault");
      var collection = db.GetCollection<Note>("notes");
      _db = collection ?? throw new ArgumentNullException(nameof(collection));
   }

   public void CreateNote(Note note, CancellationToken cancellationToken = default)
   {
      try
      {
         _db.InsertOne(note);
      }
      catch (Exception ex)
      {
         _logger.LogError("Error while creating note");
         throw ex;
      }
   }
}