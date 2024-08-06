using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VoteMaster.Application;
using VoteMaster.Domain;
using VoteMaster.Infrastructure;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VoteMaster.Api
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReferendumController : ControllerBase
    {
        private readonly ReferendumCommandService _commandService;
        private readonly ReferendumQueryService _queryService;
        private readonly ILogger<ReferendumController> _logger;

        public ReferendumController(ReferendumCommandService commandService, ReferendumQueryService queryService, ILogger<ReferendumController> logger)
        {
            _commandService = commandService;
            _queryService = queryService;
            _logger = logger;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddReferendum([FromBody] AddReferendumRequest request)
        {
            try
            {
                await _commandService.AddReferendum(request.Title);
                return Ok(new ApiResponse<string>
                {
                    Success = true,
                    Message = "Referendum added successfully.",
                    Data = null
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReferendumById(Guid id)
        {
            try
            {
                var referendum = await _queryService.GetReferendumById(id);
                if (referendum == null)
                {
                    return NotFound(new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Referendum not found.",
                        Data = null
                    });
                }
                return Ok(new ApiResponse<Referendum>
                {
                    Success = true,
                    Message = "Referendum retrieved successfully.",
                    Data = referendum
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllReferendumDetails()
        {
            try
            {
                var referendums = await _queryService.GetAllReferendumDetails();
                return Ok(new ApiResponse<IEnumerable<ReferendumDetailsDTO>>
                {
                    Success = true,
                    Message = "Referendums retrieved successfully.",
                    Data = referendums
                });
            }
            catch (Exception ex)
            {
                return ExceptionHandlerUtility.HandleException(ex, _logger);
            }
        }
    }
}