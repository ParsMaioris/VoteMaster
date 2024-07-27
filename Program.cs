using VoteMaster.Application;
using VoteMaster.Domain;
using VoteMaster.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add services to the container.
builder.Services.AddControllers();
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
builder.Services.AddScoped<EligibilityCommandService>();
builder.Services.AddScoped<EligibilityQueryService>();
builder.Services.AddScoped<IReferendumOwnerService, ReferendumOwnerService>();
builder.Services.AddScoped<IReferendumOwnerRepository, AdoNetReferendumOwnerRepository>();

// Register application services
builder.Services.AddScoped<UserCommandService>();
builder.Services.AddScoped<UserQueryService>();
builder.Services.AddScoped<ReferendumCommandService>();
builder.Services.AddScoped<ReferendumQueryService>();
builder.Services.AddScoped<VoteCommandService>();
builder.Services.AddScoped<VoteQueryService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use the global exception handler middleware
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Map controllers
app.MapControllers();

app.Run();