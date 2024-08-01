namespace VoteMaster.Api;

public class ReferendumRequestDTO
{
    public Guid UserId { get; set; }
    public string Question { get; set; }
    public string Details { get; set; }
    public DateTime ReferendumDate { get; set; }
}