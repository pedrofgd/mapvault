using MapVault.Repositories;

namespace MapVault.DependencyInjections;

public static class DataContextExtensions
{
   public static IServiceCollection AddDataContextExtensions(
      this IServiceCollection services)
   {
      services
         .AddScoped<INotesRepository, NotesRepository>();

      return services;
   }
}