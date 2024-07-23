using VoteMaster.Domain;

namespace VoteMaster.Application;

public class UserQueryService
{
    private readonly IUserService _userService;

    public UserQueryService(IUserService userService)
    {
        _userService = userService;
    }

    public Task<User> GetUserById(Guid userId)
    {
        return Task.Run(() =>
        {
            return _userService.GetUserById(userId);
        });
    }
}