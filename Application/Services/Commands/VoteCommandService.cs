using VoteMaster.Domain;

namespace VoteMaster.Application;

public class VoteCommandService
{
    private readonly IVoteService _voteService;
    private readonly IUserService _userService;
    private readonly IReferendumService _referendumService;
    private readonly IEligibilityService _eligibilityService;

    public VoteCommandService(IVoteService voteService, IUserService userService, IReferendumService referendumService, IEligibilityService eligibilityService)
    {
        _voteService = voteService;
        _userService = userService;
        _referendumService = referendumService;
        _eligibilityService = eligibilityService;
    }

    public Task AddVote(Guid userId, string userName, Guid referendumId, string referendumTitle, bool voteChoice)
    {
        return Task.Run(() =>
        {
            var user = _userService.GetUserById(userId) ?? new User(userId, userName, _eligibilityService, _voteService);
            var referendum = _referendumService.GetReferendumById(referendumId) ?? new Referendum(referendumId, referendumTitle, _voteService);
            user.Vote(referendum, voteChoice);
        });
    }
}