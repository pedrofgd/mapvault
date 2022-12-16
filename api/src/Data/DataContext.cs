using MongoDB.Driver;

namespace Data;

public class DataContext
{
   private readonly ILogger<DataContext> _logger;
   private readonly IConfiguration _configuration;

   public DataContext(
      ILogger<DataContext> logger,
      IConfiguration configuration)
   {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
   }

   public IMongoDatabase GetMongoDbConnection(string databaseName)
   {
      var connectionString = _configuration["ConnectionStrings:MongoDb"];
      
      try
      {
         var client = new MongoClient(connectionString);
         return client.GetDatabase(databaseName);
      }
      catch (Exception ex) 
      {
         throw ex;
      }
   }
}
