namespace VoteMaster.Domain;

public class VoteService : IVoteService
{
    private readonly IVoteRepository _voteRepository;

    public VoteService(IVoteRepository voteRepository)
    {
        _voteRepository = voteRepository;
    }

    public void AddVote(Vote vote)
    {
        _voteRepository.AddVote(vote);
    }

    public IEnumerable<Vote> GetVotesByReferendum(Guid referendumId, int pageNumber, int pageSize)
    {
        return _voteRepository.GetVotesByReferendumId(referendumId)
                              .Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToList();
    }

    public IEnumerable<Vote> GetRecentVotesByReferendum(Guid referendumId, int count)
    {
        return _voteRepository.GetVotesByReferendumId(referendumId)
                              .OrderByDescending(v => v.Id)
                              .Take(count)
                              .ToList();
    }

    public int GetTotalVotes(Guid referendumId)
    {
        return _voteRepository.GetVotesByReferendumId(referendumId).Count();
    }

    public int GetYesVotes(Guid referendumId)
    {
        return _voteRepository.GetVotesByReferendumId(referendumId).Count(v => v.VoteChoice);
    }

    public int GetNoVotes(Guid referendumId)
    {
        return _voteRepository.GetVotesByReferendumId(referendumId).Count(v => !v.VoteChoice);
    }

    public IEnumerable<Vote> GetVotesByUserId(Guid userId)
    {
        return _voteRepository.GetVotesByUserId(userId);
    }
}