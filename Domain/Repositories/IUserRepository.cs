namespace VoteMaster.Domain;

public interface IUserRepository
{
    void AddUser(User user);
    User GetUserById(Guid userId);
    IEnumerable<User> GetAllUsers();
}