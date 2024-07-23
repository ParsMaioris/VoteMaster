namespace VoteMaster.Domain;

public interface IVoteService
{
    void AddVote(Vote vote);
    IEnumerable<Vote> GetVotesByReferendum(int referendumId, int pageNumber, int pageSize);
    IEnumerable<Vote> GetRecentVotesByReferendum(int referendumId, int count);
    int GetTotalVotes(int referendumId);
    int GetYesVotes(int referendumId);
    int GetNoVotes(int referendumId);
    IEnumerable<Vote> GetVotesByUserId(int userId);
}