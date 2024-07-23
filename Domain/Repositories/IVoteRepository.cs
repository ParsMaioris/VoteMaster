namespace VoteMaster.Domain;

public interface IVoteRepository
{
    void AddVote(Vote vote);
    IEnumerable<Vote> GetVotesByReferendumId(Guid referendumId);
    IEnumerable<Vote> GetVotesByUserId(Guid userId);
}