// TODO: Temporary implementation for testing purposes
// No application service injection, just testing functionality
using Microsoft.AspNetCore.Mvc;
using VoteMaster.Domain;

namespace VoteMaster.Api;

[ApiController]
[Route("api/[controller]")]
public class OwnerController : ControllerBase
{
    private readonly IReferendumOwnerService _referendumOwnerService;
    private readonly IEligibilityService _eligibilityService;
    private readonly IVoteService _voteService;

    public OwnerController(IReferendumOwnerService referendumOwnerService, IEligibilityService eligibilityService,
        IVoteService voteService)
    {
        _referendumOwnerService = referendumOwnerService;
        _eligibilityService = eligibilityService;
        _voteService = voteService;
    }

    [HttpPost("{id}/addReferendum")]
    public IActionResult AddOwenerReferendum(Guid id, [FromBody] AddOwnerReferendumRequest request)
    {
        var owner = new Owner(id, "Owner Name", _eligibilityService, _voteService, _referendumOwnerService);
        owner.AddReferendum(request.Id);
        return Ok();
    }

    [HttpPost("{id}/removeReferendum")]
    public IActionResult RemoveReferendum(Guid id, [FromBody] AddOwnerReferendumRequest request)
    {
        var owner = new Owner(id, "Owner Name", _eligibilityService, _voteService, _referendumOwnerService);
        owner.RemoveReferendum(request.Id);
        return Ok();
    }

    [HttpPost("{id}/ownsReferendum")]
    public IActionResult OwnsReferendum(Guid id, [FromBody] AddOwnerReferendumRequest request)
    {
        var owner = new Owner(id, "Owner Name", _eligibilityService, _voteService, _referendumOwnerService);
        var owns = owner.OwnsReferendum(request.Id);
        return Ok(owns);
    }

    [HttpGet("{id}/getOwnedReferendums")]
    public IActionResult GetOwnedReferendums(Guid id)
    {
        var owner = new Owner(id, "Owner Name", _eligibilityService, _voteService, _referendumOwnerService);
        var ownedReferendums = owner.GetOwnedReferendums();
        return Ok(ownedReferendums);
    }
}