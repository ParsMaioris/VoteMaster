namespace VoteMaster.Domain;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public void AddUser(User user)
    {
        _userRepository.AddUser(user);
    }

    public User GetUserById(int userId)
    {
        return _userRepository.GetUserById(userId);
    }
}