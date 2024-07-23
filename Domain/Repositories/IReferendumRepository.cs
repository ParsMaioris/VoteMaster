namespace VoteMaster.Domain;

public interface IReferendumRepository
{
    void AddReferendum(Referendum referendum);
    Referendum GetReferendumById(Guid referendumId);
}