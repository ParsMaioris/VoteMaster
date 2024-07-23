namespace VoteMaster.Domain;

public class User
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    private List<Vote> _votes;

    public User(int id, string name)
    {
        Id = id;
        Name = name;
        _votes = new List<Vote>();
    }

    public Vote Vote(Referendum referendum, bool choice, IEligibilityService eligibilityService)
    {
        if (!eligibilityService.IsUserEligibleForReferendum(this, referendum))
        {
            throw new InvalidOperationException("User is not eligible to vote on this referendum.");
        }

        if (_votes.Any(v => v.ReferendumId == referendum.Id))
        {
            throw new InvalidOperationException("User has already voted on this referendum.");
        }

        var vote = new Vote(Id, referendum.Id, choice);
        _votes.Add(vote);
        return vote;
    }

    public IEnumerable<Vote> GetVotes() => _votes.AsReadOnly();
}