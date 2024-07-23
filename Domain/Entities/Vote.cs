namespace VoteMaster.Domain;

public class Vote
{
    public int Id { get; private set; }
    public int UserId { get; private set; }
    public int ReferendumId { get; private set; }
    public bool VoteChoice { get; private set; }

    public Vote(int userId, int referendumId, bool voteChoice)
        : this(userId, referendumId, voteChoice, GenerateId())
    {
    }

    public Vote(int userId, int referendumId, bool voteChoice, int id)
    {
        Id = id;
        UserId = userId;
        ReferendumId = referendumId;
        VoteChoice = voteChoice;
    }

    private static int GenerateId()
    {
        return new Random().Next(1, int.MaxValue);
    }
}