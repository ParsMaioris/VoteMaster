namespace VoteMaster.Infrastructure;

public class BadRequestException : Exception
{
    public BadRequestException(string message) : base(message)
    {
    }
}