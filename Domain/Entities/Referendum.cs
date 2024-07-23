namespace VoteMaster.Domain;

public class Referendum
{
    public int Id { get; private set; }
    public string Title { get; private set; }

    private readonly VoteService _voteService;

    public Referendum(int id, string title, VoteService voteService)
    {
        Id = id;
        Title = title;
        _voteService = voteService;
    }

    public void RegisterVote(Vote vote)
    {
        if (vote == null)
        {
            throw new ArgumentNullException(nameof(vote), "Vote cannot be null.");
        }

        if (vote.ReferendumId != Id)
        {
            throw new InvalidOperationException("Vote is for a different referendum.");
        }

        var existingVotes = _voteService.GetVotesByReferendum(Id, 1, int.MaxValue);
        if (existingVotes.Any(v => v.UserId == vote.UserId))
        {
            throw new InvalidOperationException("User has already voted on this referendum.");
        }

        _voteService.AddVote(vote);
    }

    public IEnumerable<Vote> GetVotes(int pageNumber, int pageSize)
    {
        return _voteService.GetVotesByReferendum(Id, pageNumber, pageSize);
    }

    public IEnumerable<Vote> GetRecentVotes(int count)
    {
        return _voteService.GetRecentVotesByReferendum(Id, count);
    }

    public int TotalVotes => _voteService.GetTotalVotes(Id);

    public int YesVotes => _voteService.GetYesVotes(Id);

    public int NoVotes => _voteService.GetNoVotes(Id);
}