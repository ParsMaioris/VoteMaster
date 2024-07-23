using Microsoft.AspNetCore.Mvc;
using VoteMaster.Application;

namespace VoteMaster.Api;

[ApiController]
[Route("api/[controller]")]
public class ReferendumController : ControllerBase
{
    private readonly ReferendumCommandService _commandService;
    private readonly ReferendumQueryService _queryService;

    public ReferendumController(ReferendumCommandService commandService, ReferendumQueryService queryService)
    {
        _commandService = commandService;
        _queryService = queryService;
    }

    [HttpPost]
    [Route("add")]
    public async Task<IActionResult> AddReferendum([FromBody] AddReferendumRequest request)
    {
        await _commandService.AddReferendum(request.Title);
        return Ok();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetReferendumById(Guid id)
    {
        var referendum = await _queryService.GetReferendumById(id);
        if (referendum == null)
        {
            return NotFound();
        }
        return Ok(referendum);
    }
}