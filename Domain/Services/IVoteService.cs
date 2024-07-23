namespace VoteMaster.Domain;

public interface IVoteService
{
    void AddVote(Vote vote);
    IEnumerable<Vote> GetVotesByReferendum(Guid referendumId, int pageNumber, int pageSize);
    IEnumerable<Vote> GetRecentVotesByReferendum(Guid referendumId, int count);
    int GetTotalVotes(Guid referendumId);
    int GetYesVotes(Guid referendumId);
    int GetNoVotes(Guid referendumId);
    IEnumerable<Vote> GetVotesByUserId(Guid userId);
}