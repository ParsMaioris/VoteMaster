namespace VoteMaster.Domain;

public interface IReferendumRepository
{
    Referendum GetReferendumById(int id);
    void AddReferendum(Referendum referendum);
}