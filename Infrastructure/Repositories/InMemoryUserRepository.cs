using VoteMaster.Domain;

namespace VoteMaster.Infrastructure;

public class InMemoryUserRepository : IUserRepository
{
    private readonly List<User> _users = new List<User>();

    public void AddUser(User user)
    {
        _users.Add(user);
    }

    public User GetUserById(Guid userId)
    {
        return _users.SingleOrDefault(u => u.Id == userId);
    }

    public IEnumerable<User> GetAllUsers()
    {
        return _users;
    }
}