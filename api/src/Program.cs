using MapVault.DependencyInjections;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add configuration to use AWS Parameter Store
if (!builder.Environment.IsDevelopment())
    configuration.AddSystemsManager("/mapvault");

const string CORS_POLICY = "DefaultCors";
// TODO: configure for production
builder.Services.AddCors(opt => {
    opt.AddPolicy(CORS_POLICY, policy => {
            policy.AllowAnyOrigin();
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
    });
});

// Add services to the container.
builder.Services.AddPersistenceExtensions(configuration);
builder.Services.AddDataContextExtensions();
builder.Services.AddExternalApis();
builder.Services.AddUtils();

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

app.UseCors(CORS_POLICY);

app.MapControllers();

app.Run();
