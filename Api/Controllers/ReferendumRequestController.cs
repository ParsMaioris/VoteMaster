using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VoteMaster.Application;
using VoteMaster.Infrastructure;

namespace VoteMaster.Api;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReferendumRequestController : ControllerBase
{
    private readonly ReferendumRequestService _referendumRequestService;
    private readonly ILogger<ReferendumRequestController> _logger;

    public ReferendumRequestController(ReferendumRequestService referendumRequestService, ILogger<ReferendumRequestController> logger)
    {
        _referendumRequestService = referendumRequestService;
        _logger = logger;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateReferendumRequest([FromBody] ReferendumRequestDTO requestDto)
    {
        try
        {
            await _referendumRequestService.AddAsync(requestDto);
            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Referendum request created successfully.",
                Data = "Referendum request created successfully."
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetReferendumRequestsByUserId(Guid userId)
    {
        try
        {
            var requests = await _referendumRequestService.GetByUserIdAsync(userId);
            return Ok(new ApiResponse<IEnumerable<dynamic>>
            {
                Success = true,
                Message = "Referendum requests retrieved successfully.",
                Data = requests
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllReferendumRequests()
    {
        try
        {
            var requests = await _referendumRequestService.GetAllAsync();
            return Ok(new ApiResponse<IEnumerable<dynamic>>
            {
                Success = true,
                Message = "Referendum requests retrieved successfully.",
                Data = requests
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateReferendumRequest(Guid id, [FromBody] ReferendumRequestDTO requestDto)
    {
        try
        {
            await _referendumRequestService.UpdateAsync(id, requestDto);
            return NoContent();
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }
}