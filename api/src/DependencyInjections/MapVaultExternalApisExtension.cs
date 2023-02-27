using MapVault.Http.HighlightMessage;
using MapVault.Http.HighlightMessage.OpenAI;

namespace MapVault.DependencyInjections;

public static class MapVaultExternalApisExtension
{
    public static IServiceCollection AddExternalApis(this IServiceCollection services)
    {
        services.AddHttpClient();

        services.AddScoped<IHighlightMessageClient, OpenAiClient>();

        return services;
    }
}