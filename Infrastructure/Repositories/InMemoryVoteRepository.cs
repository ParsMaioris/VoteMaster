using VoteMaster.Domain;

namespace VoteMaster.Infrastructure;

public class InMemoryVoteRepository : IVoteRepository
{
    private readonly List<Vote> _votes = new List<Vote>();

    public void AddVote(Vote vote)
    {
        _votes.Add(vote);
    }

    public IEnumerable<Vote> GetVotesByReferendumId(int referendumId)
    {
        return _votes.Where(v => v.ReferendumId == referendumId).ToList();
    }
}