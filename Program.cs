using VoteMaster.Application;
using VoteMaster.Domain;
using VoteMaster.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(); // Add this line to register controller services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register repositories and services
builder.Services.AddScoped<IVoteService, VoteService>();
builder.Services.AddScoped<IUserRepository, AdoNetUserRepository>();
builder.Services.AddScoped<IEligibilityRepository, AdoNetEligibilityRepository>();
builder.Services.AddScoped<IReferendumRepository, AdoNetReferendumRepository>();
builder.Services.AddScoped<IVoteRepository, AdoNetVoteRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEligibilityService, EligibilityService>();
builder.Services.AddScoped<IReferendumService, ReferendumService>();

// Register application services
builder.Services.AddScoped<UserCommandService>();
builder.Services.AddScoped<UserQueryService>();
builder.Services.AddScoped<ReferendumCommandService>();
builder.Services.AddScoped<ReferendumQueryService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use the global exception handler middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

// Map controllers
app.MapControllers();

app.Run();