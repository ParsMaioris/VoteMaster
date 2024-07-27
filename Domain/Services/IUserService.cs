namespace VoteMaster.Domain;

public interface IUserService
{
    void AddUser(User user);
    User GetUserById(Guid userId);
    IEnumerable<User> GetAllUsers();
}