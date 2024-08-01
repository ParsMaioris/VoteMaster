namespace VoteMaster.Domain;

public class ReferendumRequestService : IReferendumRequestService
{
    private readonly IReferendumRequestRepository _repository;

    public ReferendumRequestService(IReferendumRequestRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ReferendumRequest>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<IEnumerable<ReferendumRequest>> GetByUserAsync(User user)
    {
        return await _repository.GetByUserAsync(user);
    }

    public async Task AddAsync(ReferendumRequest request)
    {
        await _repository.AddAsync(request);
    }

    public async Task UpdateAsync(ReferendumRequest request)
    {
        await _repository.UpdateAsync(request);
    }

    public async Task<ReferendumRequest> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }
}