using Xunit;

using VoteMaster.Domain;
using Moq;

namespace VoteMaster.Tests.Domain;

public class ReferendumTests
{
    private readonly Mock<IVoteRepository> _mockVoteRepo;
    private readonly IVoteService _voteService;

    public ReferendumTests()
    {
        _mockVoteRepo = new Mock<IVoteRepository>();
        _voteService = new VoteService(_mockVoteRepo.Object);
    }

    [Fact]
    public void CreateReferendum_ShouldCreateReferendum()
    {
        // Arrange
        var referendumId = Guid.NewGuid();
        var referendum = new Referendum(referendumId, "Referendum Title", _voteService);

        // Act & Assert
        Assert.Equal(referendumId, referendum.Id);
        Assert.Equal("Referendum Title", referendum.Title);
    }

    [Fact]
    public void GetVotes_ShouldReturnVotes()
    {
        // Arrange
        var referendumId = Guid.NewGuid();
        var referendum = new Referendum(referendumId, "Referendum Title", _voteService);
        var vote1 = new Vote(Guid.NewGuid(), referendumId, true);
        var vote2 = new Vote(Guid.NewGuid(), referendumId, false);

        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(referendumId)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var votes = referendum.GetVotes(1, 10);

        // Assert
        Assert.Equal(2, votes.Count());
        Assert.Contains(vote1, votes);
        Assert.Contains(vote2, votes);
    }

    [Fact]
    public void GetRecentVotes_ShouldReturnRecentVotes()
    {
        // Arrange
        var referendumId = Guid.NewGuid();
        var referendum = new Referendum(referendumId, "Referendum Title", _voteService);
        var vote1 = new Vote(Guid.NewGuid(), referendumId, true);
        var vote2 = new Vote(Guid.NewGuid(), referendumId, false);

        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(referendumId)).Returns(new List<Vote> { vote1, vote2 });

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
        var referendumId = Guid.NewGuid();
        var referendum = new Referendum(referendumId, "Referendum Title", _voteService);
        var vote1 = new Vote(Guid.NewGuid(), referendumId, true);
        var vote2 = new Vote(Guid.NewGuid(), referendumId, false);

        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(referendumId)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var totalVotes = referendum.TotalVotes;

        // Assert
        Assert.Equal(2, totalVotes);
    }

    [Fact]
    public void YesVotes_ShouldReturnYesVotes()
    {
        // Arrange
        var referendumId = Guid.NewGuid();
        var referendum = new Referendum(referendumId, "Referendum Title", _voteService);
        var vote1 = new Vote(Guid.NewGuid(), referendumId, true);
        var vote2 = new Vote(Guid.NewGuid(), referendumId, false);

        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(referendumId)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var yesVotes = referendum.YesVotes;

        // Assert
        Assert.Equal(1, yesVotes);
    }

    [Fact]
    public void NoVotes_ShouldReturnNoVotes()
    {
        // Arrange
        var referendumId = Guid.NewGuid();
        var referendum = new Referendum(referendumId, "Referendum Title", _voteService);
        var vote1 = new Vote(Guid.NewGuid(), referendumId, true);
        var vote2 = new Vote(Guid.NewGuid(), referendumId, false);

        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(referendumId)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var noVotes = referendum.NoVotes;

        // Assert
        Assert.Equal(1, noVotes);
    }
}