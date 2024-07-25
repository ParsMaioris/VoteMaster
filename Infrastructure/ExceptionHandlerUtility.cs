using Microsoft.AspNetCore.Mvc;
using VoteMaster.Api;

namespace VoteMaster.Infrastructure;

public static class ExceptionHandlerUtility
{
    public static IActionResult HandleException(Exception ex, ILogger logger)
    {
        logger.LogError(ex, "An unexpected error occurred.");

        var response = new ErrorResponse
        {
            StatusCode = 500,
            Message = "An unexpected error occurred.",
            Detail = ex.Message
        };

        return new ObjectResult(response) { StatusCode = 500 };
    }
}