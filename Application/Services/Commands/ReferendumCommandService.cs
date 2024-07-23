
using VoteMaster.Domain;

namespace VoteMaster.Application;

public class ReferendumCommandService
{
    private readonly IVoteService _voteService;
    private readonly IReferendumRepository _referendumRepository;

    public ReferendumCommandService(IVoteService voteService, IReferendumRepository referendumRepository)
    {
        _voteService = voteService;
        _referendumRepository = referendumRepository;
    }

    public Task AddReferendum(string title)
    {
        return Task.Run(() =>
        {
            var referendumId = Guid.NewGuid();
            var referendum = new Referendum(referendumId, title, _voteService);
            _referendumRepository.AddReferendum(referendum);
        });
    }
}