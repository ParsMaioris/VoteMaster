namespace VoteMaster.Domain;

public interface IReferendumOwnerService
{
    void AddReferendumToOwner(Guid ownerId, Guid referendumId);
    void RemoveReferendumFromOwner(Guid ownerId, Guid referendumId);
    IEnumerable<Guid> GetReferendumsOwnedByUser(Guid userId);
}