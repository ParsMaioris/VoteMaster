using Xunit;

using VoteMaster.Domain;
using Moq;

namespace VoteMaster.Tests.Domain;

public class UserServiceTests
{
    private readonly Mock<IUserRepository> _mockUserRepo;
    private readonly IUserService _userService;

    public UserServiceTests()
    {
        _mockUserRepo = new Mock<IUserRepository>();
        _userService = new UserService(_mockUserRepo.Object);
    }

    [Fact]
    public void AddUser_ShouldAddUser()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = new User(userId, "John Doe", new Mock<IEligibilityService>().Object, new Mock<IVoteService>().Object);

        // Act
        _userService.AddUser(user);

        // Assert
        _mockUserRepo.Verify(repo => repo.AddUser(It.Is<User>(u => u.Id == user.Id && u.Name == user.Name)), Times.Once);
    }

    [Fact]
    public void GetUserById_ShouldReturnUser()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = new User(userId, "John Doe", new Mock<IEligibilityService>().Object, new Mock<IVoteService>().Object);
        _mockUserRepo.Setup(repo => repo.GetUserById(userId)).Returns(user);

        // Act
        var retrievedUser = _userService.GetUserById(userId);

        // Assert
        Assert.Equal(user, retrievedUser);
    }
}