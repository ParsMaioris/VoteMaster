namespace VoteMaster.Domain;

public class Vote
{
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }
    public Guid ReferendumId { get; private set; }
    public bool VoteChoice { get; private set; }

    public Vote(Guid userId, Guid referendumId, bool voteChoice)
        : this(userId, referendumId, voteChoice, GenerateId())
    {
    }

    public Vote(Guid userId, Guid referendumId, bool voteChoice, Guid id)
    {
        Id = id;
        UserId = userId;
        ReferendumId = referendumId;
        VoteChoice = voteChoice;
    }

    private static Guid GenerateId()
    {
        return Guid.NewGuid();
    }
}