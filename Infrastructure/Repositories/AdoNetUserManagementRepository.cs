using System.Data;
using System.Data.SqlClient;

namespace VoteMaster.Infrastructure;

public interface IUserManagementRepository
{
    void AddUser(string name, string passwordHash, string email, out Guid newUserId);
    void DeleteUser(Guid userId);
    void UpdatePassword(Guid userId, string newPasswordHash);
    void UpdateEmail(Guid userId, string newEmail);
    void UpdateUserName(Guid userId, string newName);
    (bool IsSuccessful, Guid UserId) SignInUser(string email, string passwordHash);
}

public class UserManagementRepository : IUserManagementRepository
{
    private readonly string _connectionString;

    public UserManagementRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public void AddUser(string name, string passwordHash, string email, out Guid newUserId)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("sp_AddUser", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            command.Parameters.AddWithValue("@Name", name);
            command.Parameters.AddWithValue("@PasswordHash", passwordHash);
            command.Parameters.AddWithValue("@Email", email);

            var outputParam = new SqlParameter("@NewUserId", SqlDbType.UniqueIdentifier)
            {
                Direction = ParameterDirection.Output
            };

            command.Parameters.Add(outputParam);

            connection.Open();
            command.ExecuteNonQuery();

            newUserId = (Guid)outputParam.Value;
        }
    }

    public void DeleteUser(Guid userId)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("sp_DeleteUser", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            command.Parameters.AddWithValue("@UserId", userId);

            connection.Open();
            command.ExecuteNonQuery();
        }
    }

    public void UpdatePassword(Guid userId, string newPasswordHash)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("sp_UpdatePassword", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            command.Parameters.AddWithValue("@UserId", userId);
            command.Parameters.AddWithValue("@NewPasswordHash", newPasswordHash);

            connection.Open();
            command.ExecuteNonQuery();
        }
    }

    public void UpdateEmail(Guid userId, string newEmail)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("sp_UpdateEmail", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            command.Parameters.AddWithValue("@UserId", userId);
            command.Parameters.AddWithValue("@NewEmail", newEmail);

            connection.Open();
            command.ExecuteNonQuery();
        }
    }

    public void UpdateUserName(Guid userId, string newName)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("sp_UpdateUserName", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            command.Parameters.AddWithValue("@UserId", userId);
            command.Parameters.AddWithValue("@NewName", newName);

            connection.Open();
            command.ExecuteNonQuery();
        }
    }

    public (bool IsSuccessful, Guid UserId) SignInUser(string email, string passwordHash)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("sp_SignInUser", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            command.Parameters.AddWithValue("@Email", email);
            command.Parameters.AddWithValue("@PasswordHash", passwordHash);

            var isSuccessfulParam = new SqlParameter("@IsSuccessful", SqlDbType.Bit)
            {
                Direction = ParameterDirection.Output
            };
            var userIdParam = new SqlParameter("@UserId", SqlDbType.UniqueIdentifier)
            {
                Direction = ParameterDirection.Output
            };

            command.Parameters.Add(isSuccessfulParam);
            command.Parameters.Add(userIdParam);

            connection.Open();
            command.ExecuteNonQuery();

            bool isSuccessful = (bool)isSuccessfulParam.Value;
            Guid userId = isSuccessful ? (Guid)userIdParam.Value : Guid.Empty;

            return (isSuccessful, userId);
        }
    }
}