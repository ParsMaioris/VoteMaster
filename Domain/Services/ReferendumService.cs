namespace VoteMaster.Domain;

public class ReferendumService : IReferendumService
{
    private readonly IReferendumRepository _referendumRepository;

    public ReferendumService(IReferendumRepository referendumRepository)
    {
        _referendumRepository = referendumRepository;
    }

    public void AddReferendum(Referendum referendum)
    {
        _referendumRepository.AddReferendum(referendum);
    }

    public Referendum GetReferendumById(Guid referendumId)
    {
        return _referendumRepository.GetReferendumById(referendumId);
    }
}