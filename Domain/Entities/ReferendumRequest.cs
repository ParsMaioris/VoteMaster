namespace VoteMaster.Domain;

public class ReferendumRequest
{
    public Guid Id { get; private set; }
    public User User { get; private set; }
    public string Question { get; private set; }
    public string Details { get; private set; }
    public DateTime ReferendumDate { get; private set; }

    public ReferendumRequest(Guid id, User user, string question, string details, DateTime referendumDate)
    {
        Id = id;
        User = user ?? throw new ArgumentNullException(nameof(user));
        Question = question ?? throw new ArgumentNullException(nameof(question));
        Details = details;
        ReferendumDate = referendumDate;
    }

    public ReferendumRequest(User user, string question, string details, DateTime referendumDate)
    {
        Id = Guid.NewGuid();
        User = user ?? throw new ArgumentNullException(nameof(user));
        Question = question ?? throw new ArgumentNullException(nameof(question));
        Details = details;
        ReferendumDate = referendumDate;
    }

    public void Update(string question, string details, DateTime referendumDate)
    {
        Question = question ?? throw new ArgumentNullException(nameof(question));
        Details = details;
        ReferendumDate = referendumDate;
    }
}