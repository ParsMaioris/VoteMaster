using VoteMaster.Domain;
using VoteMaster.Infrastructure;
using Xunit;

namespace VoteMaster.Tests.Infrastructure;

public class AdoNetEligibilityRepositoryTests
{
    private readonly ServiceProvider _serviceProvider;
    private readonly IConfiguration _configuration;

    public AdoNetEligibilityRepositoryTests()
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
    public void AddEligibility_ShouldAddEligibility()
    {
        var eligibilityRepository = _serviceProvider.GetService<IEligibilityRepository>();

        var userId = AddUser("John Doe");
        var referendumId = AddReferendum("Referendum Title");

        var eligibility = new Eligibility(userId, referendumId);

        eligibilityRepository.AddEligibility(eligibility);

        // Check if the user is eligible
        var isEligible = eligibilityRepository.IsUserEligibleForReferendum(eligibility);
        Assert.True(isEligible);
    }

    [Fact]
    public void RemoveEligibility_ShouldRemoveEligibility()
    {
        var eligibilityRepository = _serviceProvider.GetService<IEligibilityRepository>();

        var userId = AddUser("Jane Doe");
        var referendumId = AddReferendum("Referendum Title");

        var eligibility = new Eligibility(userId, referendumId);

        // First add the eligibility
        eligibilityRepository.AddEligibility(eligibility);

        // Now remove the eligibility
        eligibilityRepository.RemoveEligibility(eligibility);

        // Check if it was removed
        var isEligible = eligibilityRepository.IsUserEligibleForReferendum(eligibility);
        Assert.False(isEligible);
    }

    [Fact]
    public void IsUserEligibleForReferendum_ShouldReturnTrueWhenEligible()
    {
        var eligibilityRepository = _serviceProvider.GetService<IEligibilityRepository>();

        var userId = AddUser("Alice Doe");
        var referendumId = AddReferendum("Referendum Title");

        var eligibility = new Eligibility(userId, referendumId);

        // Add the eligibility
        eligibilityRepository.AddEligibility(eligibility);

        // Check if the user is eligible
        var isEligible = eligibilityRepository.IsUserEligibleForReferendum(eligibility);
        Assert.True(isEligible);
    }

    [Fact]
    public void IsUserEligibleForReferendum_ShouldReturnFalseWhenNotEligible()
    {
        var eligibilityRepository = _serviceProvider.GetService<IEligibilityRepository>();

        var userId = AddUser("Bob Doe");
        var referendumId = AddReferendum("Referendum Title");

        var eligibility = new Eligibility(userId, referendumId);

        // Check if the user is eligible without adding
        var isEligible = eligibilityRepository.IsUserEligibleForReferendum(eligibility);
        Assert.False(isEligible);
    }
}