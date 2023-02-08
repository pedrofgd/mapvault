using MongoDB.Driver;

namespace MapVault.Data.MongoDb;

public class MongoDbConnectionFactory
{
    private readonly ILogger<MongoDbConnectionFactory> _logger;

    private static string? _connectionString;
    private static IMongoClient _mongoClient = null!;
    private static IMongoDatabase _mongoDatabase = null!;

    private MongoDbConnectionFactory(
        ILogger<MongoDbConnectionFactory> logger)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }
    
    public static MongoDbConnectionFactory Factory(
        ILogger<MongoDbConnectionFactory> logger) => new(logger);

    public IMongoClient Connect(string databaseName, string? connectionString)
    {
        ArgumentException.ThrowIfNullOrEmpty(databaseName);
        ArgumentException.ThrowIfNullOrEmpty(connectionString);
        
        _logger.LogInformation("Connecting to Mongo database {DatabaseName}", databaseName);

        _connectionString = connectionString;
        _mongoClient = new MongoClient(_connectionString);
        _mongoDatabase = GetMongoClient().GetDatabase(databaseName);
        
        _logger.LogInformation("Mongo database {DatabaseName} has been connected", databaseName);

        return _mongoClient;
    }

    private static IMongoClient GetMongoClient()
    {
        if (_mongoClient is null) throw new Exception("MongoDb client no longer exists");
        return _mongoClient;
    }

    public static IMongoDatabase GetMongoDatabase()
    {
        if (_mongoDatabase is null) throw new Exception("Mongo database no longer exists");
        return _mongoDatabase;
    }
}