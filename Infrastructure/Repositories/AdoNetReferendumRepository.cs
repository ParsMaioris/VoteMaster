using System.Data;
using System.Data.SqlClient;
using VoteMaster.Domain;

namespace VoteMaster.Infrastructure;

public class AdoNetReferendumRepository : IReferendumRepository
{
    private readonly string _connectionString;
    private readonly IVoteService _voteService;

    public AdoNetReferendumRepository(IConfiguration configuration, IVoteService voteService)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
        _voteService = voteService;
    }

    public void AddReferendum(Referendum referendum)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("AddReferendum", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", referendum.Id);
            command.Parameters.AddWithValue("@Title", referendum.Title);

            connection.Open();
            command.ExecuteNonQuery();
        }
    }

    public Referendum GetReferendumById(Guid referendumId)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("GetReferendumById", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", referendumId);

            connection.Open();
            using (var reader = command.ExecuteReader())
            {
                if (reader.Read())
                {
                    return new Referendum(
                        reader.GetGuid(reader.GetOrdinal("Id")),
                        reader.GetString(reader.GetOrdinal("Title")),
                        _voteService
                    );
                }
            }
        }
        return null;
    }
}