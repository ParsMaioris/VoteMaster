using Microsoft.AspNetCore.Mvc;
using VoteMaster.Application;

namespace VoteMaster.Api;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserCommandService _commandService;
    private readonly UserQueryService _queryService;

    public UserController(UserCommandService commandService, UserQueryService queryService)
    {
        _commandService = commandService;
        _queryService = queryService;
    }

    [HttpPost]
    [Route("create")]
    public IActionResult CreateUser([FromBody] CreateUserRequest request)
    {
        _commandService.CreateUser(request.Name);
        return Ok();
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult GetUserById(Guid id)
    {
        var user = _queryService.GetUserById(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }
}