using VoteMaster.Domain;

namespace VoteMaster.Application;

public class UserCommandService
{
    private readonly IUserService _userService;
    private readonly IEligibilityService _eligibilityService;
    private readonly IVoteService _voteService;

    public UserCommandService(IUserService _userService, IEligibilityService eligibilityService, IVoteService voteService)
    {
        this._userService = _userService;
        _eligibilityService = eligibilityService;
        _voteService = voteService;
    }

    public void CreateUser(string name)
    {
        var userId = Guid.NewGuid();
        var user = new User(userId, name, _eligibilityService, _voteService);
        _userService.AddUser(user);
    }
}