using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using VoteMaster.Domain;

namespace VoteMaster.Infrastructure;

public class AdoNetReferendumRequestRepository : IReferendumRequestRepository
{
    private readonly string _connectionString;
    private readonly IEligibilityService _eligibilityService;
    private readonly IVoteService _voteService;
    private readonly IReferendumOwnerService _referendumOwnerService;

    public AdoNetReferendumRequestRepository(IConfiguration configuration, IEligibilityService eligibilityService, IVoteService voteService, IReferendumOwnerService referendumOwnerService)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
        _eligibilityService = eligibilityService;
        _voteService = voteService;
        _referendumOwnerService = referendumOwnerService;
    }

    public async Task<IEnumerable<ReferendumRequest>> GetAllAsync()
    {
        var requests = new List<ReferendumRequest>();

        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("GetAllFromReferendumRequests", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            connection.Open();
            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    requests.Add(MapReaderToReferendumRequest(reader));
                }
            }
        }

        return requests;
    }

    public async Task<IEnumerable<ReferendumRequest>> GetByUserAsync(User user)
    {
        var requests = new List<ReferendumRequest>();

        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("GetReferendumRequestsByUserId", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@UserId", user.Id);

            connection.Open();
            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    requests.Add(MapReaderToReferendumRequest(reader));
                }
            }
        }

        return requests;
    }

    public async Task AddAsync(ReferendumRequest request)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("AddToReferendumRequests", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", request.Id);
            command.Parameters.AddWithValue("@UserId", request.User.Id);
            command.Parameters.AddWithValue("@Question", request.Question);
            command.Parameters.AddWithValue("@Details", request.Details);
            command.Parameters.AddWithValue("@ReferendumDate", request.ReferendumDate);

            connection.Open();
            await command.ExecuteNonQueryAsync();
        }
    }

    public async Task UpdateAsync(ReferendumRequest request)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("UpdateReferendumRequests", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", request.Id);
            command.Parameters.AddWithValue("@UserId", request.User.Id);
            command.Parameters.AddWithValue("@Question", request.Question);
            command.Parameters.AddWithValue("@Details", request.Details);
            command.Parameters.AddWithValue("@ReferendumDate", request.ReferendumDate);

            connection.Open();
            await command.ExecuteNonQueryAsync();
        }
    }

    public async Task<ReferendumRequest> GetByIdAsync(Guid id)
    {
        ReferendumRequest request = null;

        using (var connection = new SqlConnection(_connectionString))
        {
            var command = new SqlCommand("GetReferendumRequestsById", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", id);

            connection.Open();
            using (var reader = await command.ExecuteReaderAsync())
            {
                if (await reader.ReadAsync())
                {
                    request = MapReaderToReferendumRequest(reader);
                }
            }
        }

        return request;
    }

    private ReferendumRequest MapReaderToReferendumRequest(SqlDataReader reader)
    {
        var user = new User(
            reader.GetGuid(reader.GetOrdinal("UserId")),
            "Default UserName",
            _eligibilityService,
            _voteService
        );

        return new ReferendumRequest(
            reader.GetGuid(reader.GetOrdinal("Id")),
            user,
            reader.GetString(reader.GetOrdinal("Question")),
            reader.GetString(reader.GetOrdinal("Details")),
            reader.GetDateTime(reader.GetOrdinal("ReferendumDate"))
        );
    }
}