namespace VoteMaster.Domain;

public interface IReferendumService
{
    void AddReferendum(Referendum referendum);
    Referendum GetReferendumById(Guid referendumId);
}