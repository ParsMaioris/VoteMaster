using System.Data;
using System.Data.SqlClient;
using VoteMaster.Domain;

namespace VoteMaster.Infrastructure;

public class AdoNetUserRepository : IUserRepository
{
    private readonly string _connectionString;
    private readonly IVoteService _voteService;
    private readonly IEligibilityService _eligibilityService;

    public AdoNetUserRepository(IConfiguration configuration, IVoteService voteService, IEligibilityService eligibilityService)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
        _voteService = voteService;
        _eligibilityService = eligibilityService;
    }

    public void AddUser(User user)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("AddUser", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", user.Id);
            command.Parameters.AddWithValue("@Name", user.Name);

            connection.Open();
            command.ExecuteNonQuery();
        }
    }

    public User GetUserById(Guid userId)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("GetUserById", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", userId);

            connection.Open();
            using (var reader = command.ExecuteReader())
            {
                if (reader.Read())
                {
                    return new User(
                        reader.GetGuid(reader.GetOrdinal("Id")),
                        reader.GetString(reader.GetOrdinal("Name")),
                        _eligibilityService,
                        _voteService
                    );
                }
            }
        }
        return null;
    }
}