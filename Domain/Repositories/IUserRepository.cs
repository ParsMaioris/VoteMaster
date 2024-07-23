namespace VoteMaster.Domain;

public interface IUserRepository
{
    User GetUserById(int id);
    void AddUser(User user);
}
