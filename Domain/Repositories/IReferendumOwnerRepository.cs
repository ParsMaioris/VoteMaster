namespace VoteMaster.Domain;

public interface IReferendumOwnerRepository
{
    void AddReferendumToOwner(Guid ownerId, Guid referendumId);
    void RemoveReferendumFromOwner(Guid ownerId, Guid referendumId);
    IEnumerable<Guid> GetReferendumIdsOwnedByUser(Guid userId);
}
