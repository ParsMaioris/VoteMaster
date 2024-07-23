namespace VoteMaster.Domain;

public interface IEligibilityRepository
{
    void AddEligibility(Eligibility eligibility);
    void RemoveEligibility(Eligibility eligibility);
    bool IsUserEligibleForReferendum(Eligibility eligibility);
}