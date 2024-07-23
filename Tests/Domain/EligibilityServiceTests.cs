using Xunit;
using VoteMaster.Domain;
using Moq;

namespace VoteMaster.Tests.Domain;

public class EligibilityServiceTests
{
    private readonly Mock<IEligibilityRepository> _mockEligibilityRepo;
    private readonly IEligibilityService _eligibilityService;

    public EligibilityServiceTests()
    {
        _mockEligibilityRepo = new Mock<IEligibilityRepository>();
        _eligibilityService = new EligibilityService(_mockEligibilityRepo.Object);
    }

    [Fact]
    public void AddEligibility_ShouldAddEligibility()
    {
        // Arrange
        var user = new User(Guid.NewGuid(), "John Doe", new Mock<IEligibilityService>().Object, new Mock<IVoteService>().Object);
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", new Mock<IVoteService>().Object);

        // Act
        _eligibilityService.AddEligibility(user, referendum);

        // Assert
        _mockEligibilityRepo.Verify(repo => repo.AddEligibility(It.Is<Eligibility>(e => e.UserId == user.Id && e.ReferendumId == referendum.Id)), Times.Once);
    }

    [Fact]
    public void RemoveEligibility_ShouldRemoveEligibility()
    {
        // Arrange
        var user = new User(Guid.NewGuid(), "John Doe", new Mock<IEligibilityService>().Object, new Mock<IVoteService>().Object);
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", new Mock<IVoteService>().Object);

        // Act
        _eligibilityService.RemoveEligibility(user, referendum);

        // Assert
        _mockEligibilityRepo.Verify(repo => repo.RemoveEligibility(It.Is<Eligibility>(e => e.UserId == user.Id && e.ReferendumId == referendum.Id)), Times.Once);
    }

    [Fact]
    public void IsUserEligibleForReferendum_ShouldReturnFalseWhenNotEligible()
    {
        // Arrange
        var user = new User(Guid.NewGuid(), "John Doe", new Mock<IEligibilityService>().Object, new Mock<IVoteService>().Object);
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", new Mock<IVoteService>().Object);
        _mockEligibilityRepo.Setup(repo => repo.IsUserEligibleForReferendum(It.Is<Eligibility>(e => e.UserId == user.Id && e.ReferendumId == referendum.Id))).Returns(false);

        // Act
        var isEligible = _eligibilityService.IsUserEligibleForReferendum(user, referendum);

        // Assert
        Assert.False(isEligible);
    }

    [Fact]
    public void IsUserEligibleForReferendum_ShouldReturnTrueWhenEligible()
    {
        // Arrange
        var user = new User(Guid.NewGuid(), "John Doe", new Mock<IEligibilityService>().Object, new Mock<IVoteService>().Object);
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", new Mock<IVoteService>().Object);
        _mockEligibilityRepo.Setup(repo => repo.IsUserEligibleForReferendum(It.Is<Eligibility>(e => e.UserId == user.Id && e.ReferendumId == referendum.Id))).Returns(true);

        // Act
        var isEligible = _eligibilityService.IsUserEligibleForReferendum(user, referendum);

        // Assert
        Assert.True(isEligible);
    }

    [Fact]
    public void AddEligibility_ShouldNotAddDuplicateEligibility()
    {
        // Arrange
        var user = new User(Guid.NewGuid(), "John Doe", new Mock<IEligibilityService>().Object, new Mock<IVoteService>().Object);
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", new Mock<IVoteService>().Object);
        _mockEligibilityRepo.Setup(repo => repo.IsUserEligibleForReferendum(It.Is<Eligibility>(e => e.UserId == user.Id && e.ReferendumId == referendum.Id))).Returns(true);

        // Act
        _eligibilityService.AddEligibility(user, referendum);

        // Assert
        _mockEligibilityRepo.Verify(repo => repo.AddEligibility(It.Is<Eligibility>(e => e.UserId == user.Id && e.ReferendumId == referendum.Id)), Times.Once);
    }
}