using System.Data;
using System.Data.SqlClient;
using VoteMaster.Domain;

namespace VoteMaster.Infrastructure;

public class AdoNetEligibilityRepository : IEligibilityRepository
{
    private readonly string _connectionString;

    public AdoNetEligibilityRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public void AddEligibility(Eligibility eligibility)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("AddEligibility", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@UserId", eligibility.UserId);
            command.Parameters.AddWithValue("@ReferendumId", eligibility.ReferendumId);

            connection.Open();
            command.ExecuteNonQuery();
        }
    }

    public void RemoveEligibility(Eligibility eligibility)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("RemoveEligibility", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@UserId", eligibility.UserId);
            command.Parameters.AddWithValue("@ReferendumId", eligibility.ReferendumId);

            connection.Open();
            command.ExecuteNonQuery();
        }
    }

    public bool IsUserEligibleForReferendum(Eligibility eligibility)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("IsUserEligibleForReferendum", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@UserId", eligibility.UserId);
            command.Parameters.AddWithValue("@ReferendumId", eligibility.ReferendumId);

            connection.Open();
            var result = command.ExecuteScalar();
            return result != null && (int)result == 1;
        }
    }
}