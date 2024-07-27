using Microsoft.AspNetCore.Mvc;
using VoteMaster.Application;
using VoteMaster.Domain;
using VoteMaster.Infrastructure;

namespace VoteMaster.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserCommandService _commandService;
        private readonly UserQueryService _queryService;
        private readonly ILogger<UserController> _logger;

        public UserController(UserCommandService commandService, UserQueryService queryService, ILogger<UserController> logger)
        {
            _commandService = commandService;
            _queryService = queryService;
            _logger = logger;
        }

        [HttpPost("create")]
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
                return Ok(new ApiResponse<User>
                {
                    Success = true,
                    Message = "User retrieved successfully.",
                    Data = user
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }

        [HttpGet()]
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
    }
}