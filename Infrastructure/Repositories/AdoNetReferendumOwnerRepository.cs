using System.Data;
using System.Data.SqlClient;
using VoteMaster.Domain;

namespace VoteMaster.Infrastructure
{
    public class AdoNetReferendumOwnerRepository : IReferendumOwnerRepository
    {
        private readonly string _connectionString;

        public AdoNetReferendumOwnerRepository(IConfiguration configuration, IVoteService voteService)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public void AddReferendumToOwner(Guid ownerId, Guid referendumId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand("AddReferendumToOwner", connection)
                {
                    CommandType = CommandType.StoredProcedure
                };
                command.Parameters.AddWithValue("@OwnerId", ownerId);
                command.Parameters.AddWithValue("@ReferendumId", referendumId);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void RemoveReferendumFromOwner(Guid ownerId, Guid referendumId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand("RemoveReferendumFromOwner", connection)
                {
                    CommandType = CommandType.StoredProcedure
                };
                command.Parameters.AddWithValue("@OwnerId", ownerId);
                command.Parameters.AddWithValue("@ReferendumId", referendumId);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public IEnumerable<Guid> GetReferendumIdsOwnedByUser(Guid userId)
        {
            var referendumIds = new List<Guid>();

            using (var connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand("GetReferendumsOwnedByUser", connection)
                {
                    CommandType = CommandType.StoredProcedure
                };
                command.Parameters.AddWithValue("@UserId", userId);

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        referendumIds.Add(reader.GetGuid(reader.GetOrdinal("ReferendumId")));
                    }
                }
            }

            return referendumIds;
        }
    }
}