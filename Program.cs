using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
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
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "VoteMaster API", Version = "v1" });

    // Configure Swagger to use the JWT token
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

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
builder.Services.AddScoped<IReferendumRequestService, VoteMaster.Domain.ReferendumRequestService>();
builder.Services.AddScoped<IReferendumRequestRepository, AdoNetReferendumRequestRepository>();
builder.Services.AddScoped<ReferendumRequestManager>();
builder.Services.AddScoped<IUserManagementRepository, UserManagementRepository>();
builder.Services.AddScoped<JwtTokenGenerator>();

// Register application services
builder.Services.AddScoped<UserCommandService>();
builder.Services.AddScoped<UserQueryService>();
builder.Services.AddScoped<ReferendumCommandService>();
builder.Services.AddScoped<ReferendumQueryService>();
builder.Services.AddScoped<VoteCommandService>();
builder.Services.AddScoped<VoteQueryService>();
builder.Services.AddScoped<OwnerService>();
builder.Services.AddScoped<VoteMaster.Application.ReferendumRequestService>();

// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// Add authorization
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "VoteMaster API v1");
    });
}

app.UseHttpsRedirection();

// Use the global exception handler middleware
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Use authentication and authorization middlewares
app.UseAuthentication();
app.UseAuthorization();

// Map controllers
app.MapControllers();

app.Run();