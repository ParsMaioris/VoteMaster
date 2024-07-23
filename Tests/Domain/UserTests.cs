using Xunit;
using Moq;

using VoteMaster.Domain;

namespace VoteMaster.Tests.Domain;

public class UserTests
{
    private readonly Mock<IEligibilityService> _mockEligibilityService;
    private readonly Mock<IVoteRepository> _mockVoteRepo;
    private readonly VoteService _voteService;

    public UserTests()
    {
        _mockEligibilityService = new Mock<IEligibilityService>();
        _mockVoteRepo = new Mock<IVoteRepository>();
        _voteService = new VoteService(_mockVoteRepo.Object);
    }

    [Fact]
    public void CreateUser_ShouldCreateUser()
    {
        // Arrange
        var user = new User(1, "John Doe");

        // Act & Assert
        Assert.Equal(1, user.Id);
        Assert.Equal("John Doe", user.Name);
    }

    [Fact]
    public void Vote_ShouldRegisterVoteIfEligible()
    {
        // Arrange
        var user = new User(1, "John Doe");
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        _mockEligibilityService.Setup(service => service.IsUserEligibleForReferendum(user, referendum)).Returns(true);

        // Act
        var vote = user.Vote(referendum, true, _mockEligibilityService.Object);

        // Assert
        Assert.Equal(user.Id, vote.UserId);
        Assert.Equal(referendum.Id, vote.ReferendumId);
        Assert.True(vote.VoteChoice);
        Assert.Contains(vote, user.GetVotes());
    }

    [Fact]
    public void Vote_ShouldThrowExceptionIfNotEligible()
    {
        // Arrange
        var user = new User(1, "John Doe");
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        _mockEligibilityService.Setup(service => service.IsUserEligibleForReferendum(user, referendum)).Returns(false);

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => user.Vote(referendum, true, _mockEligibilityService.Object));
        Assert.Equal("User is not eligible to vote on this referendum.", ex.Message);
    }

    [Fact]
    public void Vote_ShouldThrowExceptionForDoubleVoting()
    {
        // Arrange
        var user = new User(1, "John Doe");
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        _mockEligibilityService.Setup(service => service.IsUserEligibleForReferendum(user, referendum)).Returns(true);

        // Act
        user.Vote(referendum, true, _mockEligibilityService.Object);

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => user.Vote(referendum, true, _mockEligibilityService.Object));
        Assert.Equal("User has already voted on this referendum.", ex.Message);
    }

    [Fact]
    public void GetVotes_ShouldReturnAllVotes()
    {
        // Arrange
        var user = new User(1, "John Doe");
        var referendum1 = new Referendum(1, "Referendum Title 1", _voteService);
        var referendum2 = new Referendum(2, "Referendum Title 2", _voteService);
        _mockEligibilityService.Setup(service => service.IsUserEligibleForReferendum(user, referendum1)).Returns(true);
        _mockEligibilityService.Setup(service => service.IsUserEligibleForReferendum(user, referendum2)).Returns(true);

        // Act
        var vote1 = user.Vote(referendum1, true, _mockEligibilityService.Object);
        var vote2 = user.Vote(referendum2, false, _mockEligibilityService.Object);
        var votes = user.GetVotes();

        // Assert
        Assert.Contains(vote1, votes);
        Assert.Contains(vote2, votes);
        Assert.Equal(2, votes.Count());
    }
}