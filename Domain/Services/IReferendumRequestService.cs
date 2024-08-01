namespace VoteMaster.Domain;

public interface IReferendumRequestService
{
    Task<IEnumerable<ReferendumRequest>> GetAllAsync();
    Task<IEnumerable<ReferendumRequest>> GetByUserAsync(User user);
    Task AddAsync(ReferendumRequest request);
    Task UpdateAsync(ReferendumRequest request);
    Task<ReferendumRequest> GetByIdAsync(Guid id);
}