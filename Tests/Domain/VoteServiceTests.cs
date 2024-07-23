using Xunit;
using VoteMaster.Domain;
using VoteMaster.Infrastructure;

namespace VoteMaster.Tests.Domain;

public class VoteServiceTests
{
    private readonly IVoteRepository _voteRepository;
    private readonly IVoteService _voteService;

    public VoteServiceTests()
    {
        _voteRepository = new InMemoryVoteRepository();
        _voteService = new VoteService(_voteRepository);
    }

    [Fact]
    public void AddVote_ShouldAddVote()
    {
        // Arrange
        var vote = new Vote(1, 1, true);

        // Act
        _voteService.AddVote(vote);

        // Assert
        var votes = _voteRepository.GetVotesByReferendumId(1);
        Assert.Contains(vote, votes);
    }

    [Fact]
    public void GetVotesByReferendum_ShouldReturnVotesForReferendum()
    {
        // Arrange
        var vote1 = new Vote(1, 1, true);
        var vote2 = new Vote(2, 1, false);
        _voteService.AddVote(vote1);
        _voteService.AddVote(vote2);

        // Act
        var votes = _voteService.GetVotesByReferendum(1, 1, 10);

        // Assert
        Assert.Equal(2, votes.Count());
        Assert.Contains(vote1, votes);
        Assert.Contains(vote2, votes);
    }

    [Fact]
    public void GetRecentVotesByReferendum_ShouldReturnMostRecentVotes()
    {
        // Arrange
        var vote1 = new Vote(1, 1, true, 1);
        var vote2 = new Vote(2, 1, false, 2);
        _voteService.AddVote(vote1);
        _voteService.AddVote(vote2);

        // Act
        var recentVotes = _voteService.GetRecentVotesByReferendum(1, 1);

        // Assert
        Assert.Single(recentVotes);
        Assert.Contains(vote2, recentVotes);
    }

    [Fact]
    public void GetTotalVotes_ShouldReturnTotalVotes()
    {
        // Arrange
        var vote1 = new Vote(1, 1, true);
        var vote2 = new Vote(2, 1, false);
        _voteService.AddVote(vote1);
        _voteService.AddVote(vote2);

        // Act
        var totalVotes = _voteService.GetTotalVotes(1);

        // Assert
        Assert.Equal(2, totalVotes);
    }

    [Fact]
    public void GetYesVotes_ShouldReturnYesVotes()
    {
        // Arrange
        var vote1 = new Vote(1, 1, true);
        var vote2 = new Vote(2, 1, false);
        _voteService.AddVote(vote1);
        _voteService.AddVote(vote2);

        // Act
        var yesVotes = _voteService.GetYesVotes(1);

        // Assert
        Assert.Equal(1, yesVotes);
    }

    [Fact]
    public void GetNoVotes_ShouldReturnNoVotes()
    {
        // Arrange
        var vote1 = new Vote(1, 1, true);
        var vote2 = new Vote(2, 1, false);
        _voteService.AddVote(vote1);
        _voteService.AddVote(vote2);

        // Act
        var noVotes = _voteService.GetNoVotes(1);

        // Assert
        Assert.Equal(1, noVotes);
    }
}