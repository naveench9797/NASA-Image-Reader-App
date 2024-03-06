using Microsoft.Extensions.FileProviders;
using NASA_Image_Reader_App.Extensions;
using Serilog;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Logging.ClearProviders(); // Clear existing providers
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.File($"Logs/{Assembly.GetExecutingAssembly().GetName().Name}.log")
    .CreateLogger();

builder.Services.AddControllers();
builder.Services.RegisterServices();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
var app = builder.Build();
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions()
{
    OnPrepareResponse = ctx => {
        ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
        ctx.Context.Response.Headers.Append("Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept");
    },

    FileProvider = new PhysicalFileProvider(
                            Path.Combine(Directory.GetCurrentDirectory(), @"Content/NASA-Images")),
    RequestPath = new PathString("/app-content")
});
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
