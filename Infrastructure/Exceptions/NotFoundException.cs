namespace VoteMaster.Infrastructure;

public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message)
    {
    }
}