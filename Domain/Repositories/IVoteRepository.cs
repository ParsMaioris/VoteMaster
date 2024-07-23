namespace VoteMaster.Domain;

public interface IVoteRepository
{
    void AddVote(Vote vote);
    IEnumerable<Vote> GetVotesByReferendumId(int referendumId);
}