using VoteMaster.Domain;

namespace VoteMaster.Application;

public class UserQueryService
{
    private readonly IUserService _userService;

    public UserQueryService(IUserService userRepository)
    {
        _userService = userRepository;
    }

    public User GetUserById(Guid userId)
    {
        return _userService.GetUserById(userId);
    }
}