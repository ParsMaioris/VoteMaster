using Xunit;
using Moq;

using VoteMaster.Domain;

namespace VoteMaster.Tests.Domain;

public class UserTests
{
    private readonly Mock<IEligibilityService> _mockEligibilityService;
    private readonly Mock<IVoteService> _mockVoteService;
    private readonly User _user;

    public UserTests()
    {
        _mockEligibilityService = new Mock<IEligibilityService>();
        _mockVoteService = new Mock<IVoteService>();
        _user = new User(Guid.NewGuid(), "John Doe", _mockEligibilityService.Object, _mockVoteService.Object);
    }

    [Fact]
    public void AddEligibility_ShouldAddEligibility()
    {
        // Arrange
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", _mockVoteService.Object);

        // Act
        _user.AddEligibility(referendum);

        // Assert
        _mockEligibilityService.Verify(service => service.AddEligibility(_user, referendum), Times.Once);
    }

    [Fact]
    public void RemoveEligibility_ShouldRemoveEligibility()
    {
        // Arrange
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", _mockVoteService.Object);

        // Act
        _user.RemoveEligibility(referendum);

        // Assert
        _mockEligibilityService.Verify(service => service.RemoveEligibility(_user, referendum), Times.Once);
    }

    [Fact]
    public void IsEligibleForReferendum_ShouldReturnTrueWhenEligible()
    {
        // Arrange
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", _mockVoteService.Object);
        _mockEligibilityService.Setup(service => service.IsUserEligibleForReferendum(_user, referendum)).Returns(true);

        // Act
        var isEligible = _user.IsEligibleForReferendum(referendum);

        // Assert
        Assert.True(isEligible);
    }

    [Fact]
    public void IsEligibleForReferendum_ShouldReturnFalseWhenNotEligible()
    {
        // Arrange
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", _mockVoteService.Object);
        _mockEligibilityService.Setup(service => service.IsUserEligibleForReferendum(_user, referendum)).Returns(false);

        // Act
        var isEligible = _user.IsEligibleForReferendum(referendum);

        // Assert
        Assert.False(isEligible);
    }

    [Fact]
    public void Vote_ShouldRegisterVoteIfEligible()
    {
        // Arrange
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", _mockVoteService.Object);
        _mockEligibilityService.Setup(service => service.IsUserEligibleForReferendum(_user, referendum)).Returns(true);
        _mockVoteService.Setup(service => service.GetVotesByReferendum(referendum.Id, 1, int.MaxValue)).Returns(new List<Vote>());

        // Act
        var vote = _user.Vote(referendum, true);

        // Assert
        _mockVoteService.Verify(service => service.AddVote(It.Is<Vote>(v => v.UserId == _user.Id && v.ReferendumId == referendum.Id)), Times.Once);
        Assert.NotNull(vote);
    }

    [Fact]
    public void Vote_ShouldThrowExceptionIfNotEligible()
    {
        // Arrange
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", _mockVoteService.Object);
        _mockEligibilityService.Setup(service => service.IsUserEligibleForReferendum(_user, referendum)).Returns(false);

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => _user.Vote(referendum, true));
        Assert.Equal("User is not eligible to vote on this referendum.", ex.Message);
    }

    [Fact]
    public void Vote_ShouldThrowExceptionForDoubleVoting()
    {
        // Arrange
        var referendum = new Referendum(Guid.NewGuid(), "Referendum Title", _mockVoteService.Object);
        _mockEligibilityService.Setup(service => service.IsUserEligibleForReferendum(_user, referendum)).Returns(true);
        _mockVoteService.Setup(service => service.GetVotesByReferendum(referendum.Id, 1, int.MaxValue)).Returns(new List<Vote> { new Vote(_user.Id, referendum.Id, true) });

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => _user.Vote(referendum, true));
        Assert.Equal("User has already voted on this referendum.", ex.Message);
    }

    [Fact]
    public void GetVotes_ShouldReturnAllVotes()
    {
        // Arrange
        var votes = new List<Vote>
            {
                new Vote(_user.Id, Guid.NewGuid(), true),
                new Vote(_user.Id, Guid.NewGuid(), false)
            };
        _mockVoteService.Setup(service => service.GetVotesByReferendum(_user.Id, 1, int.MaxValue)).Returns(votes);

        // Act
        var result = _user.GetVotes();

        // Assert
        Assert.Equal(votes, result);
    }
}