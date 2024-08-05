using VoteMaster.Domain;

namespace VoteMaster.Infrastructure;

public class InMemoryEligibilityRepository : IEligibilityRepository
{
    private readonly HashSet<Eligibility> _eligibilities = new HashSet<Eligibility>();

    public void AddEligibility(Eligibility eligibility)
    {
        _eligibilities.Add(eligibility);
    }

    public void RemoveEligibility(Eligibility eligibility)
    {
        _eligibilities.Remove(eligibility);
    }

    public bool IsUserEligibleForReferendum(Eligibility eligibility)
    {
        return _eligibilities.Contains(eligibility);
    }

    public IEnumerable<Guid> GetEligibleReferendumsForUser(Guid userId)
    {
        throw new NotImplementedException();
    }
}