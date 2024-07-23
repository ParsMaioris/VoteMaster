using System.Data;
using System.Data.SqlClient;
using VoteMaster.Domain;

namespace VoteMaster.Infrastructure;

public class AdoNetVoteRepository : IVoteRepository
{
    private readonly string _connectionString;

    public AdoNetVoteRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public void AddVote(Vote vote)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("AddVote", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", vote.Id);
            command.Parameters.AddWithValue("@UserId", vote.UserId);
            command.Parameters.AddWithValue("@ReferendumId", vote.ReferendumId);
            command.Parameters.AddWithValue("@VoteChoice", vote.VoteChoice);

            connection.Open();
            command.ExecuteNonQuery();
        }
    }

    public IEnumerable<Vote> GetVotesByReferendumId(Guid referendumId)
    {
        var votes = new List<Vote>();

        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("GetVotesByReferendumId", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@ReferendumId", referendumId);

            connection.Open();
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    votes.Add(new Vote(
                        reader.GetGuid(reader.GetOrdinal("UserId")),
                        reader.GetGuid(reader.GetOrdinal("ReferendumId")),
                        reader.GetBoolean(reader.GetOrdinal("VoteChoice")),
                        reader.GetGuid(reader.GetOrdinal("Id"))
                    ));
                }
            }
        }

        return votes;
    }

    public IEnumerable<Vote> GetVotesByUserId(Guid userId)
    {
        var votes = new List<Vote>();

        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("GetVotesByUserId", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@UserId", userId);

            connection.Open();
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    votes.Add(new Vote(
                        reader.GetGuid(reader.GetOrdinal("UserId")),
                        reader.GetGuid(reader.GetOrdinal("ReferendumId")),
                        reader.GetBoolean(reader.GetOrdinal("VoteChoice")),
                        reader.GetGuid(reader.GetOrdinal("Id"))
                    ));
                }
            }
        }

        return votes;
    }
}