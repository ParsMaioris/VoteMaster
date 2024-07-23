namespace VoteMaster.Domain;

public class EligibilityService : IEligibilityService
{
    private readonly IEligibilityRepository _eligibilityRepository;

    public EligibilityService(IEligibilityRepository eligibilityRepository)
    {
        _eligibilityRepository = eligibilityRepository;
    }

    public void AddEligibility(User user, Referendum referendum)
    {
        _eligibilityRepository.AddEligibility(new Eligibility(user.Id, referendum.Id));
    }

    public void RemoveEligibility(User user, Referendum referendum)
    {
        _eligibilityRepository.RemoveEligibility(new Eligibility(user.Id, referendum.Id));
    }

    public bool IsUserEligibleForReferendum(User user, Referendum referendum)
    {
        return _eligibilityRepository.IsUserEligibleForReferendum(new Eligibility(user.Id, referendum.Id));
    }
}