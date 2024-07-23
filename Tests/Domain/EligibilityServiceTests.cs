using Xunit;
using VoteMaster.Domain;
using Moq;

namespace VoteMaster.Tests.Domain;

public class EligibilityServiceTests
{
    [Fact]
    public void AddEligibility_ShouldAddEligibility()
    {
        // Arrange
        var user = new User(1, "John Doe");
        var referendum = new Referendum(1, "Referendum Title", new VoteService(new Mock<IVoteRepository>().Object));
        var eligibilityService = new EligibilityService();

        // Act
        eligibilityService.AddEligibility(user, referendum);

        // Assert
        Assert.True(eligibilityService.IsUserEligibleForReferendum(user, referendum));
    }

    [Fact]
    public void RemoveEligibility_ShouldRemoveEligibility()
    {
        // Arrange
        var user = new User(1, "John Doe");
        var referendum = new Referendum(1, "Referendum Title", new VoteService(new Mock<IVoteRepository>().Object));
        var eligibilityService = new EligibilityService();
        eligibilityService.AddEligibility(user, referendum);

        // Act
        eligibilityService.RemoveEligibility(user, referendum);

        // Assert
        Assert.False(eligibilityService.IsUserEligibleForReferendum(user, referendum));
    }

    [Fact]
    public void IsUserEligibleForReferendum_ShouldReturnFalseWhenNotEligible()
    {
        // Arrange
        var user = new User(1, "John Doe");
        var referendum = new Referendum(1, "Referendum Title", new VoteService(new Mock<IVoteRepository>().Object));
        var eligibilityService = new EligibilityService();

        // Act
        var isEligible = eligibilityService.IsUserEligibleForReferendum(user, referendum);

        // Assert
        Assert.False(isEligible);
    }

    [Fact]
    public void IsUserEligibleForReferendum_ShouldReturnTrueWhenEligible()
    {
        // Arrange
        var user = new User(1, "John Doe");
        var referendum = new Referendum(1, "Referendum Title", new VoteService(new Mock<IVoteRepository>().Object));
        var eligibilityService = new EligibilityService();
        eligibilityService.AddEligibility(user, referendum);

        // Act
        var isEligible = eligibilityService.IsUserEligibleForReferendum(user, referendum);

        // Assert
        Assert.True(isEligible);
    }

    [Fact]
    public void AddEligibility_ShouldNotAddDuplicateEligibility()
    {
        // Arrange
        var user = new User(1, "John Doe");
        var referendum = new Referendum(1, "Referendum Title", new VoteService(new Mock<IVoteRepository>().Object));
        var eligibilityService = new EligibilityService();
        eligibilityService.AddEligibility(user, referendum);

        // Act
        eligibilityService.AddEligibility(user, referendum);

        // Assert
        Assert.True(eligibilityService.IsUserEligibleForReferendum(user, referendum));
    }
}