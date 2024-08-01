using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using VoteMaster.Application;
using VoteMaster.Domain;
using VoteMaster.Infrastructure;

namespace VoteMaster.Api;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserCommandService _commandService;
    private readonly UserQueryService _queryService;
    private readonly ILogger<UserController> _logger;
    IConfiguration _configuration;

    public UserController(UserCommandService commandService, UserQueryService queryService, ILogger<UserController> logger, IConfiguration configuration)
    {
        _commandService = commandService;
        _queryService = queryService;
        _logger = logger;
        _configuration = configuration;
    }

    [HttpPost("create")]
    [Authorize]
    public IActionResult CreateUser([FromBody] CreateUserRequest request)
    {
        try
        {
            _commandService.CreateUser(request.Name);
            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "User created successfully.",
                Data = null
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        try
        {
            var user = await _queryService.GetUserById(id);
            if (user == null)
            {
                return NotFound(new ApiResponse<string>
                {
                    Success = false,
                    Message = "User not found.",
                    Data = null
                });
            }

            var token = GenerateJwtToken(user.Id);

            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "User retrieved successfully.",
                Data = token
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpGet()]
    [Authorize]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = await _queryService.GetAllUsers();
            return Ok(new ApiResponse<IEnumerable<User>>
            {
                Success = true,
                Message = "Users retrieved successfully.",
                Data = users
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    private string GenerateJwtToken(Guid userId)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}