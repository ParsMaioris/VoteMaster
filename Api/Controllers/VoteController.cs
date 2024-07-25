using Microsoft.AspNetCore.Mvc;
using VoteMaster.Application;
using VoteMaster.Infrastructure;

namespace VoteMaster.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class VoteController : ControllerBase
    {
        private readonly VoteCommandService _commandService;
        private readonly VoteQueryService _queryService;
        private readonly ILogger<VoteController> _logger;

        public VoteController(VoteCommandService commandService, VoteQueryService queryService, ILogger<VoteController> logger)
        {
            _commandService = commandService;
            _queryService = queryService;
            _logger = logger;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddVote([FromBody] VoteRequest request)
        {
            try
            {
                await _commandService.AddVote(request.UserId, request.UserName, request.ReferendumId, request.ReferendumTitle, request.VoteChoice);
                return Ok(new ApiResponse<string>
                {
                    Success = true,
                    Message = "Vote added successfully.",
                    Data = null
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }

        [HttpGet("referendum/{referendumId}")]
        public async Task<IActionResult> GetVotesByReferendum(Guid referendumId, int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                var votes = await _queryService.GetVotesByReferendum(referendumId, pageNumber, pageSize);
                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Votes retrieved successfully.",
                    Data = votes
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }

        [HttpGet("referendum/{referendumId}/recent")]
        public async Task<IActionResult> GetRecentVotesByReferendum(Guid referendumId, int count = 5)
        {
            try
            {
                var votes = await _queryService.GetRecentVotesByReferendum(referendumId, count);
                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Recent votes retrieved successfully.",
                    Data = votes
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }

        [HttpGet("referendum/{referendumId}/total")]
        public async Task<IActionResult> GetTotalVotes(Guid referendumId)
        {
            try
            {
                var totalVotes = await _queryService.GetTotalVotes(referendumId);
                return Ok(new ApiResponse<int>
                {
                    Success = true,
                    Message = "Total votes retrieved successfully.",
                    Data = totalVotes
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }

        [HttpGet("referendum/{referendumId}/yes")]
        public async Task<IActionResult> GetYesVotes(Guid referendumId)
        {
            try
            {
                var yesVotes = await _queryService.GetYesVotes(referendumId);
                return Ok(new ApiResponse<int>
                {
                    Success = true,
                    Message = "Yes votes retrieved successfully.",
                    Data = yesVotes
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }

        [HttpGet("referendum/{referendumId}/no")]
        public async Task<IActionResult> GetNoVotes(Guid referendumId)
        {
            try
            {
                var noVotes = await _queryService.GetNoVotes(referendumId);
                return Ok(new ApiResponse<int>
                {
                    Success = true,
                    Message = "No votes retrieved successfully.",
                    Data = noVotes
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetVotesByUserId(Guid userId)
        {
            try
            {
                var votes = await _queryService.GetVotesByUserId(userId);
                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "User votes retrieved successfully.",
                    Data = votes
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }
    }
}