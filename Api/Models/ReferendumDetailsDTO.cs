namespace VoteMaster.Api;

public class ReferendumDetailsDTO
{
    public Guid ReferendumId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Image { get; set; }
    public string Key { get; set; }
    public DateTime PublicationDate { get; set; }
    public DateTime EndTime { get; set; }
}