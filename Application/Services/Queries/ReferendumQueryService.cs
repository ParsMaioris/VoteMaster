using VoteMaster.Domain;

namespace VoteMaster.Application;

public class ReferendumQueryService
{
    private readonly IReferendumService _referendumService;

    public ReferendumQueryService(IReferendumService referendumService)
    {
        _referendumService = referendumService;
    }

    public Task<Referendum> GetReferendumById(Guid referendumId)
    {
        return Task.Run(() =>
        {
            return _referendumService.GetReferendumById(referendumId);
        });
    }
}