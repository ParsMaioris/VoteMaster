namespace VoteMaster.Domain;

public class ReferendumRequestManager
{
    private readonly IReferendumRequestService _service;

    public ReferendumRequestManager(IReferendumRequestService service)
    {
        _service = service;
    }

    public async Task<IEnumerable<ReferendumRequest>> GetAllRequests()
    {
        return await _service.GetAllAsync();
    }

    public async Task<IEnumerable<ReferendumRequest>> GetRequestsByUser(User user)
    {
        return await _service.GetByUserAsync(user);
    }

    public async Task AddRequest(User user, string question, string details, DateTime referendumDate)
    {
        var request = new ReferendumRequest(user, question, details, referendumDate);
        await _service.AddAsync(request);
    }

    public async Task UpdateRequest(Guid id, User user, string question, string details, DateTime referendumDate)
    {
        var request = await _service.GetByIdAsync(id);
        request.Update(question, details, referendumDate);
        await _service.UpdateAsync(request);
    }

    public async Task<ReferendumRequest> GetRequestById(Guid id)
    {
        return await _service.GetByIdAsync(id);
    }
}