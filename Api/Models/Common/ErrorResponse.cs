namespace VoteMaster.Api;

public class ErrorResponse
{
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string Detail { get; set; }
}