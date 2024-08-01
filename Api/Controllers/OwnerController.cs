using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VoteMaster.Application;

namespace VoteMaster.Api;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OwnerController : ControllerBase
{
    private readonly OwnerService _ownerService;

    public OwnerController(OwnerService ownerService)
    {
        _ownerService = ownerService;
    }

    [HttpPost("{id}/addReferendum")]
    public async Task<IActionResult> AddOwnerReferendum(Guid id, [FromBody] AddOwnerReferendumRequest request)
    {
        await _ownerService.AddReferendumAsync(id, request.Id);
        return Ok();
    }

    [HttpPost("{id}/removeReferendum")]
    public async Task<IActionResult> RemoveReferendum(Guid id, [FromBody] AddOwnerReferendumRequest request)
    {
        await _ownerService.RemoveReferendumAsync(id, request.Id);
        return Ok();
    }

    [HttpPost("{id}/ownsReferendum")]
    public async Task<IActionResult> OwnsReferendum(Guid id, [FromBody] AddOwnerReferendumRequest request)
    {
        var owns = await _ownerService.OwnsReferendumAsync(id, request.Id);
        return Ok(owns);
    }

    [HttpGet("{id}/getOwnedReferendums")]
    public async Task<IActionResult> GetOwnedReferendums(Guid id)
    {
        var ownedReferendums = await _ownerService.GetOwnedReferendumsAsync(id);
        return Ok(ownedReferendums);
    }
}