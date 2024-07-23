using VoteMaster.Domain;
using VoteMaster.Infrastructure;
using Xunit;

namespace VoteMaster.Tests.Infrastructure;

public class AdoNetVoteRepositoryTests
{
    private readonly ServiceProvider _serviceProvider;
    private readonly IConfiguration _configuration;

    public AdoNetVoteRepositoryTests()
    {
        // Build configuration
        _configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        // Setup dependency injection
        _serviceProvider = new ServiceCollection()
            .AddSingleton<IConfiguration>(_configuration)
            .AddSingleton<IVoteService, VoteService>()
            .AddSingleton<IUserRepository, AdoNetUserRepository>()
            .AddSingleton<IReferendumRepository, AdoNetReferendumRepository>()
            .AddSingleton<IEligibilityRepository, AdoNetEligibilityRepository>()
            .AddSingleton<IVoteRepository, AdoNetVoteRepository>()
            .BuildServiceProvider();
    }

    private Guid AddUser(string name)
    {
        var userRepository = _serviceProvider.GetService<IUserRepository>();
        var userId = Guid.NewGuid();
        var user = new User(userId, name, null, _serviceProvider.GetService<IVoteService>());
        userRepository.AddUser(user);
        return userId;
    }

    private Guid AddReferendum(string title)
    {
        var referendumRepository = _serviceProvider.GetService<IReferendumRepository>();
        var referendumId = Guid.NewGuid();
        var referendum = new Referendum(referendumId, title, _serviceProvider.GetService<IVoteService>());
        referendumRepository.AddReferendum(referendum);
        return referendumId;
    }

    [Fact]
    public void AddVote_ShouldAddVote()
    {
        var voteRepository = _serviceProvider.GetService<IVoteRepository>();

        var userId = AddUser("John Doe");
        var referendumId = AddReferendum("Referendum Title");

        var vote = new Vote(userId, referendumId, true, Guid.NewGuid());

        voteRepository.AddVote(vote);

        // Additional assertions can be made here if needed
    }

    [Fact]
    public void GetVotesByReferendumId_ShouldReturnVotesForReferendum()
    {
        var voteRepository = _serviceProvider.GetService<IVoteRepository>();

        var userId1 = AddUser("Jane Doe");
        var userId2 = AddUser("John Smith");
        var referendumId = AddReferendum("Referendum Title");

        var vote1 = new Vote(userId1, referendumId, true, Guid.NewGuid());
        var vote2 = new Vote(userId2, referendumId, false, Guid.NewGuid());

        voteRepository.AddVote(vote1);
        voteRepository.AddVote(vote2);

        var votes = voteRepository.GetVotesByReferendumId(referendumId);

        Assert.Contains(vote1, votes);
        Assert.Contains(vote2, votes);
    }

    [Fact]
    public void GetVotesByUserId_ShouldReturnVotesForUser()
    {
        var voteRepository = _serviceProvider.GetService<IVoteRepository>();

        var userId = AddUser("Alice Doe");
        var referendumId1 = AddReferendum("Referendum Title 1");
        var referendumId2 = AddReferendum("Referendum Title 2");

        var vote1 = new Vote(userId, referendumId1, true, Guid.NewGuid());
        var vote2 = new Vote(userId, referendumId2, false, Guid.NewGuid());

        voteRepository.AddVote(vote1);
        voteRepository.AddVote(vote2);

        var votes = voteRepository.GetVotesByUserId(userId);

        Assert.Contains(vote1, votes);
        Assert.Contains(vote2, votes);
    }
}