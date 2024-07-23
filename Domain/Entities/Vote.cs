namespace VoteMaster.Domain;

public class Vote : IEquatable<Vote>
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

    public bool Equals(Vote other)
    {
        if (other == null) return false;
        return Id == other.Id && UserId == other.UserId && ReferendumId == other.ReferendumId && VoteChoice == other.VoteChoice;
    }

    public override bool Equals(object obj)
    {
        if (obj is Vote otherVote)
        {
            return Equals(otherVote);
        }
        return false;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Id, UserId, ReferendumId, VoteChoice);
    }
}