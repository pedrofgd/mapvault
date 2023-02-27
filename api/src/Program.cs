using MapVault.DependencyInjections;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add configuration to use AWS Parameter Store
if (!builder.Environment.IsDevelopment())
    configuration.AddSystemsManager("/mapvault");

// Add services to the container.
builder.Services.AddPersistenceExtensions(configuration);
builder.Services.AddDataContextExtensions();
builder.Services.AddExternalApis();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
