using Microsoft.AspNetCore.Mvc;
using VoteMaster.Application;

namespace VoteMaster.Api;

[ApiController]
[Route("api/[controller]")]
public class EligibilityController : ControllerBase
{
    private readonly EligibilityCommandService _commandService;
    private readonly EligibilityQueryService _queryService;

    public EligibilityController(EligibilityCommandService commandService, EligibilityQueryService queryService)
    {
        _commandService = commandService;
        _queryService = queryService;
    }

    [HttpPost]
    [Route("add")]
    public async Task<IActionResult> AddEligibility([FromBody] EligibilityRequest request)
    {
        await _commandService.AddEligibility(request.UserId, request.UserName, request.ReferendumId, request.ReferendumTitle);
        return Ok();
    }

    [HttpPost]
    [Route("remove")]
    public async Task<IActionResult> RemoveEligibility([FromBody] EligibilityRequest request)
    {
        await _commandService.RemoveEligibility(request.UserId, request.UserName, request.ReferendumId, request.ReferendumTitle);
        return Ok();
    }

    [HttpGet]
    [Route("check")]
    public async Task<IActionResult> IsUserEligibleForReferendum(Guid userId, string userName, Guid referendumId, string referendumTitle)
    {
        var isEligible = await _queryService.IsUserEligibleForReferendum(userId, userName, referendumId, referendumTitle);
        return Ok(isEligible);
    }
}