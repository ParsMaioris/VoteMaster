namespace VoteMaster.Domain;

public interface IUserService
{
    void AddUser(User user);
    User GetUserById(int userId);
}