namespace VoteMaster.Domain;

public class Referendum
{
    public int Id { get; private set; }
    public string Title { get; private set; }

    private readonly IVoteService _voteService;

    public Referendum(int id, string title, IVoteService voteService)
    {
        Id = id;
        Title = title;
        _voteService = voteService;
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