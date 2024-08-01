using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VoteMaster.Application;
using VoteMaster.Infrastructure;

namespace VoteMaster.Api;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EligibilityController : ControllerBase
{
    private readonly EligibilityCommandService _commandService;
    private readonly EligibilityQueryService _queryService;
    private readonly ILogger<EligibilityController> _logger;

    public EligibilityController(EligibilityCommandService commandService, EligibilityQueryService queryService, ILogger<EligibilityController> logger)
    {
        _commandService = commandService;
        _queryService = queryService;
        _logger = logger;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddEligibility([FromBody] EligibilityRequest request)
    {
        try
        {
            await _commandService.AddEligibility(request.UserId, request.UserName, request.ReferendumId, request.ReferendumTitle);
            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Eligibility added successfully.",
                Data = null
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpPost("remove")]
    public async Task<IActionResult> RemoveEligibility([FromBody] EligibilityRequest request)
    {
        try
        {
            await _commandService.RemoveEligibility(request.UserId, request.UserName, request.ReferendumId, request.ReferendumTitle);
            return Ok(new ApiResponse<string>
            {
                Success = true,
                Message = "Eligibility removed successfully.",
                Data = null
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }

    [HttpGet("check")]
    public async Task<IActionResult> IsUserEligibleForReferendum(Guid userId, string userName, Guid referendumId, string referendumTitle)
    {
        try
        {
            var isEligible = await _queryService.IsUserEligibleForReferendum(userId, userName, referendumId, referendumTitle);
            return Ok(new ApiResponse<bool>
            {
                Success = true,
                Message = "Eligibility check completed.",
                Data = isEligible
            });
        }
        catch (Exception ex)
        {
            return ExceptionHandlerUtility.HandleException(ex, _logger);
        }
    }
}