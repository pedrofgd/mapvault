using Data;
using Repositories;

namespace DependencyInjections;

public static class DataContextExtansions
{
   public static IServiceCollection AddDataContextExtensions(
      this IServiceCollection services)
   {
      services
         .AddScoped<DataContext>()
         .AddScoped<INotesRepository, NotesRepository>();

      return services;
   }
}