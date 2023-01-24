using DependencyInjections;

var builder = WebApplication.CreateBuilder(args);

// Add configuration to use AWS Parameter Store
builder.Configuration.AddSystemsManager("/mapvault");

// Add services to the container.
builder.Services.AddDataContextExtensions();

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
