using MapVault.Utils;

namespace MapVault.DependencyInjections;

public static class MapVaultUtilsExtensions
{
    public static IServiceCollection AddUtils(this IServiceCollection services)
    {
        services.AddScoped<HighlightExceptionMessage>();
        
        return services;
    }
}