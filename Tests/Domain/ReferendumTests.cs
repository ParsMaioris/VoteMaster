using Xunit;

using VoteMaster.Domain;
using Moq;

namespace VoteMaster.Tests.Domain;

public class ReferendumTests
{
    private readonly Mock<IVoteRepository> _mockVoteRepo;
    private readonly VoteService _voteService;

    public ReferendumTests()
    {
        _mockVoteRepo = new Mock<IVoteRepository>();
        _voteService = new VoteService(_mockVoteRepo.Object);
    }

    [Fact]
    public void CreateReferendum_ShouldCreateReferendum()
    {
        // Arrange
        var referendum = new Referendum(1, "Referendum Title", _voteService);

        // Act & Assert
        Assert.Equal(1, referendum.Id);
        Assert.Equal("Referendum Title", referendum.Title);
    }

    [Fact]
    public void RegisterVote_ShouldRegisterVote()
    {
        // Arrange
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        var vote = new Vote(1, 1, true);

        // Act
        referendum.RegisterVote(vote);

        // Assert
        _mockVoteRepo.Verify(repo => repo.AddVote(It.Is<Vote>(v => v.UserId == vote.UserId && v.ReferendumId == vote.ReferendumId)), Times.Once);
    }

    [Fact]
    public void RegisterVote_ShouldPreventDoubleVoting()
    {
        // Arrange
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        var vote = new Vote(1, 1, true);

        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(1)).Returns(new List<Vote> { vote });

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => referendum.RegisterVote(vote));
        Assert.Equal("User has already voted on this referendum.", ex.Message);
    }

    [Fact]
    public void GetVotes_ShouldReturnAllVotes()
    {
        // Arrange
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        var vote1 = new Vote(1, 1, true);
        var vote2 = new Vote(2, 1, false);

        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(1)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var votes = referendum.GetVotes(1, 10);

        // Assert
        Assert.Equal(2, votes.Count());
        Assert.Contains(vote1, votes);
        Assert.Contains(vote2, votes);
    }

    [Fact]
    public void RegisterVote_ShouldThrowExceptionWhenVoteIsNull()
    {
        // Arrange
        var referendum = new Referendum(1, "Referendum Title", _voteService);

        // Act & Assert
        var ex = Assert.Throws<ArgumentNullException>(() => referendum.RegisterVote(null));
        Assert.Equal("Vote cannot be null. (Parameter 'vote')", ex.Message);
    }

    [Fact]
    public void RegisterVote_ShouldThrowExceptionForInvalidReferendumId()
    {
        // Arrange
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        var vote = new Vote(1, 2, true); // Mismatched ReferendumId

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => referendum.RegisterVote(vote));
        Assert.Equal("Vote is for a different referendum.", ex.Message);
    }

    [Fact]
    public void GetRecentVotes_ShouldReturnRecentVotes()
    {
        // Arrange
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        var vote1 = new Vote(1, 1, true, 1);  // Assigned specific Id
        var vote2 = new Vote(2, 1, false, 2); // Assigned specific Id

        // Setup repository to return the votes in the specified order
        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(1)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var recentVotes = referendum.GetRecentVotes(1);

        // Assert
        Assert.Single(recentVotes);
        Assert.Contains(vote2, recentVotes);
    }

    [Fact]
    public void TotalVotes_ShouldReturnTotalVotes()
    {
        // Arrange
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        var vote1 = new Vote(1, 1, true);
        var vote2 = new Vote(2, 1, false);

        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(1)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var totalVotes = referendum.TotalVotes;

        // Assert
        Assert.Equal(2, totalVotes);
    }

    [Fact]
    public void YesVotes_ShouldReturnYesVotes()
    {
        // Arrange
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        var vote1 = new Vote(1, 1, true);
        var vote2 = new Vote(2, 1, false);

        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(1)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var yesVotes = referendum.YesVotes;

        // Assert
        Assert.Equal(1, yesVotes);
    }

    [Fact]
    public void NoVotes_ShouldReturnNoVotes()
    {
        // Arrange
        var referendum = new Referendum(1, "Referendum Title", _voteService);
        var vote1 = new Vote(1, 1, true);
        var vote2 = new Vote(2, 1, false);

        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(1)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var noVotes = referendum.NoVotes;

        // Assert
        Assert.Equal(1, noVotes);
    }
}