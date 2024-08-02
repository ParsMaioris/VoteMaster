using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VoteMaster.Infrastructure;

namespace VoteMaster.Api;

[ApiController]
[Route("api/[controller]")]
public class UserManagerController : ControllerBase
{
    private readonly IUserManagementRepository _userManagementRepository;
    private readonly ILogger<UserManagerController> _logger;

    public UserManagerController(IUserManagementRepository userManagementRepository, ILogger<UserManagerController> logger)
    {
        _userManagementRepository = userManagementRepository;
        _logger = logger;
    }

    [HttpPost("add")]
    public IActionResult AddUser([FromBody] UserAddRequest request)
    {
        try
        {
            _userManagementRepository.AddUser(request.Name, request.PasswordHash, request.Email, out Guid newUserId);
            return Ok(new ApiResponse<Guid>
            {
                Success = true,
                Message = "User added successfully.",
                Data = newUserId
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpPost("delete")]
    [Authorize]
    public IActionResult DeleteUser([FromBody] UserDeleteRequest request)
    {
        try
        {
            _userManagementRepository.DeleteUser(request.UserId);
            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "User deleted successfully.",
                Data = null
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpPost("update/password")]
    [Authorize]
    public IActionResult UpdatePassword([FromBody] UserUpdatePasswordRequest request)
    {
        try
        {
            _userManagementRepository.UpdatePassword(request.UserId, request.NewPasswordHash);
            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Password updated successfully.",
                Data = null
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpPost("update/email")]
    [Authorize]
    public IActionResult UpdateEmail([FromBody] UserUpdateEmailRequest request)
    {
        try
        {
            _userManagementRepository.UpdateEmail(request.UserId, request.NewEmail);
            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Email updated successfully.",
                Data = null
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpPost("update/name")]
    [Authorize]
    public IActionResult UpdateUserName([FromBody] UserUpdateNameRequest request)
    {
        try
        {
            _userManagementRepository.UpdateUserName(request.UserId, request.NewName);
            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "User name updated successfully.",
                Data = null
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpPost("signin")]
    public IActionResult SignInUser([FromBody] UserSignInRequest request)
    {
        try
        {
            bool isSuccessful = _userManagementRepository.SignInUser(request.Email, request.PasswordHash);
            return Ok(new ApiResponse<bool>
            {
                Success = isSuccessful,
                Message = isSuccessful ? "Sign-in successful." : "Invalid email or password.",
                Data = isSuccessful
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }
}

public class UserAddRequest
{
    public string Name { get; set; }
    public string PasswordHash { get; set; }
    public string Email { get; set; }
}

public class UserDeleteRequest
{
    public Guid UserId { get; set; }
}

public class UserUpdatePasswordRequest
{
    public Guid UserId { get; set; }
    public string NewPasswordHash { get; set; }
}

public class UserUpdateEmailRequest
{
    public Guid UserId { get; set; }
    public string NewEmail { get; set; }
}

public class UserUpdateNameRequest
{
    public Guid UserId { get; set; }
    public string NewName { get; set; }
}

public class UserSignInRequest
{
    public string Email { get; set; }
    public string PasswordHash { get; set; }
}