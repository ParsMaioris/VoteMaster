using VoteMaster.Domain;

namespace VoteMaster.Application;

public class OwnerService
{
    private readonly IReferendumOwnerService _referendumOwnerService;
    private readonly IEligibilityService _eligibilityService;
    private readonly IVoteService _voteService;

    public OwnerService(IReferendumOwnerService referendumOwnerService, IEligibilityService eligibilityService,
        IVoteService voteService)
    {
        _referendumOwnerService = referendumOwnerService;
        _eligibilityService = eligibilityService;
        _voteService = voteService;
    }

    public async Task AddReferendumAsync(Guid ownerId, Guid referendumId)
    {
        await Task.Run(() =>
        {
            var owner = new Owner(ownerId, "Owner Name", _eligibilityService, _voteService, _referendumOwnerService);
            owner.AddReferendum(referendumId);
        });
    }

    public async Task RemoveReferendumAsync(Guid ownerId, Guid referendumId)
    {
        await Task.Run(() =>
        {
            var owner = new Owner(ownerId, "Owner Name", _eligibilityService, _voteService, _referendumOwnerService);
            owner.RemoveReferendum(referendumId);
        });
    }

    public async Task<bool> OwnsReferendumAsync(Guid ownerId, Guid referendumId)
    {
        return await Task.Run(() =>
        {
            var owner = new Owner(ownerId, "Owner Name", _eligibilityService, _voteService, _referendumOwnerService);
            return owner.OwnsReferendum(referendumId);
        });
    }

    public async Task<IEnumerable<Guid>> GetOwnedReferendumsAsync(Guid ownerId)
    {
        return await Task.Run(() =>
        {
            var owner = new Owner(ownerId, "Owner Name", _eligibilityService, _voteService, _referendumOwnerService);
            return owner.GetOwnedReferendums();
        });
    }
}