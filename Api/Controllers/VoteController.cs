using Microsoft.AspNetCore.Mvc;
using VoteMaster.Application;

namespace VoteMaster.Api;

[ApiController]
[Route("api/[controller]")]
public class VoteController : ControllerBase
{
    private readonly VoteCommandService _commandService;
    private readonly VoteQueryService _queryService;

    public VoteController(VoteCommandService commandService, VoteQueryService queryService)
    {
        _commandService = commandService;
        _queryService = queryService;
    }

    [HttpPost]
    [Route("add")]
    public async Task<IActionResult> AddVote([FromBody] VoteRequest request)
    {
        await _commandService.AddVote(request.UserId, request.UserName, request.ReferendumId, request.ReferendumTitle, request.VoteChoice);
        return Ok();
    }

    [HttpGet]
    [Route("referendum/{referendumId}")]
    public async Task<IActionResult> GetVotesByReferendum(Guid referendumId, int pageNumber = 1, int pageSize = 10)
    {
        var votes = await _queryService.GetVotesByReferendum(referendumId, pageNumber, pageSize);
        return Ok(votes);
    }

    [HttpGet]
    [Route("referendum/{referendumId}/recent")]
    public async Task<IActionResult> GetRecentVotesByReferendum(Guid referendumId, int count = 5)
    {
        var votes = await _queryService.GetRecentVotesByReferendum(referendumId, count);
        return Ok(votes);
    }

    [HttpGet]
    [Route("referendum/{referendumId}/total")]
    public async Task<IActionResult> GetTotalVotes(Guid referendumId)
    {
        var totalVotes = await _queryService.GetTotalVotes(referendumId);
        return Ok(totalVotes);
    }

    [HttpGet]
    [Route("referendum/{referendumId}/yes")]
    public async Task<IActionResult> GetYesVotes(Guid referendumId)
    {
        var yesVotes = await _queryService.GetYesVotes(referendumId);
        return Ok(yesVotes);
    }

    [HttpGet]
    [Route("referendum/{referendumId}/no")]
    public async Task<IActionResult> GetNoVotes(Guid referendumId)
    {
        var noVotes = await _queryService.GetNoVotes(referendumId);
        return Ok(noVotes);
    }

    [HttpGet]
    [Route("user/{userId}")]
    public async Task<IActionResult> GetVotesByUserId(Guid userId)
    {
        var votes = await _queryService.GetVotesByUserId(userId);
        return Ok(votes);
    }
}