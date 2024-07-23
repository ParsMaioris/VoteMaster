namespace VoteMaster.Api;

public class VoteRequest
{
    public Guid UserId { get; set; }
    public string UserName { get; set; }
    public Guid ReferendumId { get; set; }
    public string ReferendumTitle { get; set; }
    public bool VoteChoice { get; set; }
}