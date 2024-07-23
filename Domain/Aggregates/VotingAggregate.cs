namespace VoteMaster.Domain;

public class VotingAggregate
{
    public User User { get; private set; }
    public Referendum Referendum { get; private set; }
    public Vote Vote { get; private set; }

    public VotingAggregate(User user, Referendum referendum, Vote vote)
    {
        User = user;
        Referendum = referendum;
        Vote = vote;
    }
}