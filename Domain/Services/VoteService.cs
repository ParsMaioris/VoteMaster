namespace VoteMaster.Domain;

public class VoteService
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

    public IEnumerable<Vote> GetVotesByReferendum(int referendumId, int pageNumber, int pageSize)
    {
        return _voteRepository.GetVotesByReferendumId(referendumId)
                              .Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToList();
    }

    public IEnumerable<Vote> GetRecentVotesByReferendum(int referendumId, int count)
    {
        return _voteRepository.GetVotesByReferendumId(referendumId)
                              .OrderByDescending(v => v.Id) // Assuming Id is sequential
                              .Take(count)
                              .ToList();
    }

    public int GetTotalVotes(int referendumId)
    {
        return _voteRepository.GetVotesByReferendumId(referendumId).Count();
    }

    public int GetYesVotes(int referendumId)
    {
        return _voteRepository.GetVotesByReferendumId(referendumId).Count(v => v.VoteChoice);
    }

    public int GetNoVotes(int referendumId)
    {
        return _voteRepository.GetVotesByReferendumId(referendumId).Count(v => !v.VoteChoice);
    }
}
