namespace VoteMaster.Domain;

public class Eligibility
{
    public Guid UserId { get; }
    public Guid ReferendumId { get; }

    public Eligibility(Guid userId, Guid referendumId)
    {
        UserId = userId;
        ReferendumId = referendumId;
    }

    public override bool Equals(object obj)
    {
        if (obj is Eligibility other)
        {
            return UserId == other.UserId && ReferendumId == other.ReferendumId;
        }
        return false;
    }

    public override int GetHashCode() => HashCode.Combine(UserId, ReferendumId);
}
