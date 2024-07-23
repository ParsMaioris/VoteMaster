using VoteMaster.Domain;
using VoteMaster.Infrastructure;
using Xunit;

namespace VoteMaster.Tests.Infrastructure;

public class AdoNetReferendumRepositoryTests
{
    private readonly ServiceProvider _serviceProvider;
    private readonly IConfiguration _configuration;

    public AdoNetReferendumRepositoryTests()
    {
        _configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        _serviceProvider = new ServiceCollection()
            .AddSingleton<IConfiguration>(_configuration)
            .AddSingleton<IVoteService, VoteService>()
            .AddSingleton<IReferendumRepository, AdoNetReferendumRepository>()
            .AddSingleton<IVoteRepository, AdoNetVoteRepository>()
            .BuildServiceProvider();
    }

    [Fact]
    public void AddReferendum_ShouldAddReferendum()
    {
        var referendumRepository = _serviceProvider.GetService<IReferendumRepository>();

        var referendumId = Guid.NewGuid();
        var referendum = new Referendum(referendumId, "Referendum Title", _serviceProvider.GetService<IVoteService>());

        referendumRepository.AddReferendum(referendum);
    }

    [Fact]
    public void GetReferendumById_ShouldReturnReferendum()
    {
        var referendumRepository = _serviceProvider.GetService<IReferendumRepository>();

        var referendumId = Guid.NewGuid();
        var referendum = new Referendum(referendumId, "Referendum Title", _serviceProvider.GetService<IVoteService>());
        referendumRepository.AddReferendum(referendum);

        var retrievedReferendum = referendumRepository.GetReferendumById(referendumId);

        Assert.NotNull(retrievedReferendum);
        Assert.Equal(referendumId, retrievedReferendum.Id);
        Assert.Equal("Referendum Title", retrievedReferendum.Title);
    }
}