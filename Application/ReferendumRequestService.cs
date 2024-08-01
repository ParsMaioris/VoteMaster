using VoteMaster.Api;
using VoteMaster.Domain;

namespace VoteMaster.Application;

public class ReferendumRequestService
{
    private readonly ReferendumRequestManager _referendumRequestManager;
    private readonly IEligibilityService _eligibilityService;
    private readonly IVoteService _voteService;
    private readonly IReferendumOwnerService _referendumOwnerService;

    public ReferendumRequestService(
        ReferendumRequestManager referendumRequestManager,
        IEligibilityService eligibilityService,
        IVoteService voteService,
        IReferendumOwnerService referendumOwnerService)
    {
        _referendumRequestManager = referendumRequestManager;
        _eligibilityService = eligibilityService;
        _voteService = voteService;
        _referendumOwnerService = referendumOwnerService;
    }

    public async Task<IEnumerable<ReferendumRequest>> GetAllAsync()
    {
        return await _referendumRequestManager.GetAllRequests();
    }

    public async Task<IEnumerable<ReferendumRequest>> GetByUserIdAsync(Guid userId)
    {
        var user = new User(userId, "User Name", _eligibilityService, _voteService);
        return await _referendumRequestManager.GetRequestsByUser(user);
    }

    public async Task AddAsync(ReferendumRequestDTO requestDto)
    {
        var user = new User(requestDto.UserId, "User Name", _eligibilityService, _voteService);
        var request = new ReferendumRequest(user, requestDto.Question, requestDto.Details, requestDto.ReferendumDate);
        await _referendumRequestManager.AddRequest(user, request.Question, request.Details, request.ReferendumDate);
    }

    public async Task UpdateAsync(Guid id, ReferendumRequestDTO requestDto)
    {
        var user = new User(requestDto.UserId, "User Name", _eligibilityService, _voteService);
        var request = await _referendumRequestManager.GetRequestById(id);
        if (request != null)
        {
            request.Update(requestDto.Question, requestDto.Details, requestDto.ReferendumDate);
            await _referendumRequestManager.UpdateRequest(request.Id, user, requestDto.Question, requestDto.Details, requestDto.ReferendumDate);
        }
    }
}