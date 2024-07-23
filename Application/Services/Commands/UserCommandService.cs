using VoteMaster.Domain;

namespace VoteMaster.Application;

public class UserCommandService
{
    private readonly IUserService _userService;
    private readonly IEligibilityService _eligibilityService;
    private readonly IVoteService _voteService;

    public UserCommandService(IUserService userService, IEligibilityService eligibilityService, IVoteService voteService)
    {
        _userService = userService;
        _eligibilityService = eligibilityService;
        _voteService = voteService;
    }

    public Task CreateUser(string name)
    {
        return Task.Run(() =>
        {
            var userId = Guid.NewGuid();
            var user = new User(userId, name, _eligibilityService, _voteService);
            _userService.AddUser(user);
        });
    }
}