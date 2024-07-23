using VoteMaster.Domain;

namespace VoteMaster.Application;

public class EligibilityCommandService
{
    private readonly IEligibilityService _eligibilityService;
    private readonly IUserService _userService;
    private readonly IReferendumService _referendumService;
    private readonly IVoteService _voteService;

    public EligibilityCommandService(
        IEligibilityService eligibilityService,
        IUserService userService,
        IReferendumService referendumService,
        IVoteService voteService)
    {
        _eligibilityService = eligibilityService;
        _userService = userService;
        _referendumService = referendumService;
        _voteService = voteService;
    }

    public Task AddEligibility(Guid userId, string userName, Guid referendumId, string referendumTitle)
    {
        return Task.Run(() =>
        {
            var user = _userService.GetUserById(userId) ?? new User(userId, userName, _eligibilityService, _voteService);
            var referendum = _referendumService.GetReferendumById(referendumId) ?? new Referendum(referendumId, referendumTitle, _voteService);
            user.AddEligibility(referendum);
        });
    }

    public Task RemoveEligibility(Guid userId, string userName, Guid referendumId, string referendumTitle)
    {
        return Task.Run(() =>
        {
            var user = _userService.GetUserById(userId) ?? new User(userId, userName, _eligibilityService, _voteService);
            var referendum = _referendumService.GetReferendumById(referendumId) ?? new Referendum(referendumId, referendumTitle, _voteService);
            user.RemoveEligibility(referendum);
        });
    }
}