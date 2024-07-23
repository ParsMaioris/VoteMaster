namespace VoteMaster.Domain;

public interface IEligibilityService
{
    void AddEligibility(User user, Referendum referendum);
    void RemoveEligibility(User user, Referendum referendum);
    bool IsUserEligibleForReferendum(User user, Referendum referendum);
}