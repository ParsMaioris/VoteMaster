using Xunit;
using Moq;
using VoteMaster.Domain;

namespace VoteMaster.Tests.Domain;
public class VoteServiceTests
{
    private readonly Mock<IVoteRepository> _mockVoteRepo;
    private readonly VoteService _voteService;

    public VoteServiceTests()
    {
        _mockVoteRepo = new Mock<IVoteRepository>();
        _voteService = new VoteService(_mockVoteRepo.Object);
    }

    [Fact]
    public void AddVote_ShouldAddVote()
    {
        // Arrange
        var vote = new Vote(1, 1, true);

        // Act
        _voteService.AddVote(vote);

        // Assert
        _mockVoteRepo.Verify(repo => repo.AddVote(It.Is<Vote>(v => v.UserId == vote.UserId && v.ReferendumId == vote.ReferendumId)), Times.Once);
    }

    [Fact]
    public void GetVotesByReferendum_ShouldReturnVotesForReferendum()
    {
        // Arrange
        var referendumId = 1;
        var vote1 = new Vote(1, referendumId, true);
        var vote2 = new Vote(2, referendumId, false);
        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(referendumId)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var votes = _voteService.GetVotesByReferendum(referendumId, 1, 10);

        // Assert
        Assert.Equal(2, votes.Count());
        Assert.Contains(vote1, votes);
        Assert.Contains(vote2, votes);
    }

    [Fact]
    public void GetRecentVotesByReferendum_ShouldReturnMostRecentVotes()
    {
        // Arrange
        var referendumId = 1;
        var vote1 = new Vote(1, referendumId, true, 1);
        var vote2 = new Vote(2, referendumId, false, 2);
        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(referendumId)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var recentVotes = _voteService.GetRecentVotesByReferendum(referendumId, 1);

        // Assert
        Assert.Single(recentVotes);
        Assert.Contains(vote2, recentVotes);
    }

    [Fact]
    public void GetTotalVotes_ShouldReturnTotalVotes()
    {
        // Arrange
        var referendumId = 1;
        var vote1 = new Vote(1, referendumId, true);
        var vote2 = new Vote(2, referendumId, false);
        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(referendumId)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var totalVotes = _voteService.GetTotalVotes(referendumId);

        // Assert
        Assert.Equal(2, totalVotes);
    }

    [Fact]
    public void GetYesVotes_ShouldReturnYesVotes()
    {
        // Arrange
        var referendumId = 1;
        var vote1 = new Vote(1, referendumId, true);
        var vote2 = new Vote(2, referendumId, false);
        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(referendumId)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var yesVotes = _voteService.GetYesVotes(referendumId);

        // Assert
        Assert.Equal(1, yesVotes);
    }

    [Fact]
    public void GetNoVotes_ShouldReturnNoVotes()
    {
        // Arrange
        var referendumId = 1;
        var vote1 = new Vote(1, referendumId, true);
        var vote2 = new Vote(2, referendumId, false);
        _mockVoteRepo.Setup(repo => repo.GetVotesByReferendumId(referendumId)).Returns(new List<Vote> { vote1, vote2 });

        // Act
        var noVotes = _voteService.GetNoVotes(referendumId);

        // Assert
        Assert.Equal(1, noVotes);
    }
}