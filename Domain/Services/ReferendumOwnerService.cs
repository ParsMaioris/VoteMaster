namespace VoteMaster.Domain;

public class ReferendumOwnerService : IReferendumOwnerService
{
    private readonly IReferendumOwnerRepository _referendumOwnerRepository;

    public ReferendumOwnerService(IReferendumOwnerRepository referendumOwnerRepository)
    {
        _referendumOwnerRepository = referendumOwnerRepository;
    }

    public void AddReferendumToOwner(Guid ownerId, Guid referendumId)
    {
        _referendumOwnerRepository.AddReferendumToOwner(ownerId, referendumId);
    }

    public void RemoveReferendumFromOwner(Guid ownerId, Guid referendumId)
    {
        _referendumOwnerRepository.RemoveReferendumFromOwner(ownerId, referendumId);
    }

    public IEnumerable<Guid> GetReferendumsOwnedByUser(Guid userId)
    {
        return _referendumOwnerRepository.GetReferendumIdsOwnedByUser(userId);
    }
}
