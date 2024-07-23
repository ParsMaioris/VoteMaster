using VoteMaster.Domain;

namespace VoteMaster.Application;

public class VoteQueryService
{
    private readonly IVoteService _voteService;

    public VoteQueryService(IVoteService voteService)
    {
        _voteService = voteService;
    }

    public Task<IEnumerable<Vote>> GetVotesByReferendum(Guid referendumId, int pageNumber, int pageSize)
    {
        return Task.Run(() => _voteService.GetVotesByReferendum(referendumId, pageNumber, pageSize));
    }

    public Task<IEnumerable<Vote>> GetRecentVotesByReferendum(Guid referendumId, int count)
    {
        return Task.Run(() => _voteService.GetRecentVotesByReferendum(referendumId, count));
    }

    public Task<int> GetTotalVotes(Guid referendumId)
    {
        return Task.Run(() => _voteService.GetTotalVotes(referendumId));
    }

    public Task<int> GetYesVotes(Guid referendumId)
    {
        return Task.Run(() => _voteService.GetYesVotes(referendumId));
    }

    public Task<int> GetNoVotes(Guid referendumId)
    {
        return Task.Run(() => _voteService.GetNoVotes(referendumId));
    }

    public Task<IEnumerable<Vote>> GetVotesByUserId(Guid userId)
    {
        return Task.Run(() => _voteService.GetVotesByUserId(userId));
    }
}