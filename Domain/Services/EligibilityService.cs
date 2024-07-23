namespace VoteMaster.Domain;

public class EligibilityService : IEligibilityService
{
    private readonly HashSet<Eligibility> _eligibilities;

    public EligibilityService()
    {
        _eligibilities = new HashSet<Eligibility>();
    }

    public void AddEligibility(User user, Referendum referendum)
    {
        _eligibilities.Add(new Eligibility(user.Id, referendum.Id));
    }

    public void RemoveEligibility(User user, Referendum referendum)
    {
        _eligibilities.Remove(new Eligibility(user.Id, referendum.Id));
    }

    public bool IsUserEligibleForReferendum(User user, Referendum referendum)
    {
        return _eligibilities.Contains(new Eligibility(user.Id, referendum.Id));
    }
}