using MapVault.Data.Mappings;
using MapVault.Data.MongoDb;

namespace MapVault.DependencyInjections;

public static class MapVaultPersistenceExtensions
{
    public static IServiceCollection AddPersistenceExtensions(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        NoteMap.Map.Fields();

        var serviceProvider = services.BuildServiceProvider();
        var mongoDbClient = MongoDbConnectionFactory
            .Factory(serviceProvider.GetRequiredService<ILogger<MongoDbConnectionFactory>>())
            .Connect("mapvault", 
                configuration["ConnectionStrings:MongoDb"]);

        services.AddSingleton(mongoDbClient);
        
        return services;
    }
}