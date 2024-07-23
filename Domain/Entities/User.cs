namespace VoteMaster.Domain;

public class User
{
    public int Id { get; private set; }
    public string Name { get; private set; }

    private readonly IEligibilityService _eligibilityService;
    private readonly IVoteService _voteService;

    public User(int id, string name, IEligibilityService eligibilityService, IVoteService voteService)
    {
        Id = id;
        Name = name;
        _eligibilityService = eligibilityService;
        _voteService = voteService;
    }

    public void AddEligibility(Referendum referendum)
    {
        _eligibilityService.AddEligibility(this, referendum);
    }

    public void RemoveEligibility(Referendum referendum)
    {
        _eligibilityService.RemoveEligibility(this, referendum);
    }

    public bool IsEligibleForReferendum(Referendum referendum)
    {
        return _eligibilityService.IsUserEligibleForReferendum(this, referendum);
    }

    public Vote Vote(Referendum referendum, bool choice)
    {
        if (!IsEligibleForReferendum(referendum))
        {
            throw new InvalidOperationException("User is not eligible to vote on this referendum.");
        }

        var existingVotes = _voteService.GetVotesByReferendum(referendum.Id, 1, int.MaxValue);
        if (existingVotes.Any(v => v.UserId == Id))
        {
            throw new InvalidOperationException("User has already voted on this referendum.");
        }

        var vote = new Vote(Id, referendum.Id, choice);
        _voteService.AddVote(vote);
        return vote;
    }

    public IEnumerable<Vote> GetVotes()
    {
        return _voteService.GetVotesByReferendum(Id, 1, int.MaxValue).Where(v => v.UserId == Id);
    }
}