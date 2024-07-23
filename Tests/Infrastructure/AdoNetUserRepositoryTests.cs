using VoteMaster.Domain;
using VoteMaster.Infrastructure;
using Xunit;

namespace VoteMaster.Tests.Infrastructure;

public class AdoNetUserRepositoryTests
{
    private readonly ServiceProvider _serviceProvider;
    private readonly IConfiguration _configuration;

    public AdoNetUserRepositoryTests()
    {
        _configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        _serviceProvider = new ServiceCollection()
            .AddSingleton<IConfiguration>(_configuration)
            .AddSingleton<IVoteService, VoteService>()
            .AddSingleton<IUserRepository, AdoNetUserRepository>()
            .AddSingleton<IVoteRepository, AdoNetVoteRepository>()
            .BuildServiceProvider();
    }

    [Fact]
    public void AddUser_ShouldAddUser()
    {
        var userRepository = _serviceProvider.GetService<IUserRepository>();

        var userId = Guid.NewGuid();
        var user = new User(userId, "John Doe", null, _serviceProvider.GetService<IVoteService>());

        userRepository.AddUser(user);
    }

    [Fact]
    public void GetUserById_ShouldReturnUser()
    {
        var userRepository = _serviceProvider.GetService<IUserRepository>();

        var userId = Guid.NewGuid();
        var user = new User(userId, "John Doe", null, _serviceProvider.GetService<IVoteService>());
        userRepository.AddUser(user);

        var retrievedUser = userRepository.GetUserById(userId);

        Assert.NotNull(retrievedUser);
        Assert.Equal(userId, retrievedUser.Id);
        Assert.Equal("John Doe", retrievedUser.Name);
    }
}