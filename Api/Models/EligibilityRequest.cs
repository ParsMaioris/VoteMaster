namespace VoteMaster.Api;

public class EligibilityRequest
{
    public Guid UserId { get; set; }
    public string UserName { get; set; }
    public Guid ReferendumId { get; set; }
    public string ReferendumTitle { get; set; }
}