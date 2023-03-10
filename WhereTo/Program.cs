using System.Text.Json.Serialization;
using StackExchange.Redis;
using WhereTo.DataLayer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddSingleton<IConnectionMultiplexer>(opt=>
    ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("RedisConnection"))
);

builder.Services.AddScoped<IDogadjajRepo, DogadjajRepo>();
builder.Services.AddScoped<ILokalRepo, LokalRepo>();
builder.Services.AddScoped<IKorisnikRepo, KorisnikRepo>();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyAllowSpecificOrigins",
                      policy  =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

app.UseCors("MyAllowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
