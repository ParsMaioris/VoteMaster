namespace VoteMaster.Domain;

public interface IUserRepository
{
    void AddUser(User user);
    User GetUserById(int userId);
}