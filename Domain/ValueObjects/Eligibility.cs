namespace VoteMaster.Domain;

public class Eligibility
{
    public int UserId { get; }
    public int ReferendumId { get; }

    public Eligibility(int userId, int referendumId)
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
