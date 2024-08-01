CREATE OR ALTER PROCEDURE AddEligibility
    @UserId UNIQUEIDENTIFIER,
    @ReferendumId UNIQUEIDENTIFIER
AS
BEGIN
    INSERT INTO Eligibilities (UserId, ReferendumId)
    VALUES (@UserId, @ReferendumId);
END
GO

CREATE OR ALTER PROCEDURE RemoveEligibility
    @UserId UNIQUEIDENTIFIER,
    @ReferendumId UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM Eligibilities
    WHERE UserId = @UserId AND ReferendumId = @ReferendumId;
END
GO

CREATE OR ALTER PROCEDURE IsUserEligibleForReferendum
    @UserId UNIQUEIDENTIFIER,
    @ReferendumId UNIQUEIDENTIFIER
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Eligibilities WHERE UserId = @UserId AND ReferendumId = @ReferendumId)
    BEGIN
        SELECT 1 AS IsEligible;
    END
    ELSE
    BEGIN
        SELECT 0 AS IsEligible;
    END
END
GO

CREATE OR ALTER PROCEDURE AddReferendum
    @Id UNIQUEIDENTIFIER,
    @Title NVARCHAR(200)
AS
BEGIN
    INSERT INTO Referendums (Id, Title)
    VALUES (@Id, @Title);
END
GO

CREATE OR ALTER PROCEDURE GetReferendumById
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    SELECT Id, Title
    FROM Referendums
    WHERE Id = @Id;
END
GO

CREATE OR ALTER PROCEDURE AddUser
    @Id UNIQUEIDENTIFIER,
    @Name NVARCHAR(100)
AS
BEGIN
    INSERT INTO Users (Id, Name)
    VALUES (@Id, @Name);
END
GO

CREATE OR ALTER PROCEDURE GetUserById
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    SELECT Id, Name
    FROM Users
    WHERE Id = @Id;
END
GO

CREATE OR ALTER PROCEDURE AddVote
    @Id UNIQUEIDENTIFIER,
    @UserId UNIQUEIDENTIFIER,
    @ReferendumId UNIQUEIDENTIFIER,
    @VoteChoice BIT
AS
BEGIN
    INSERT INTO Votes (Id, UserId, ReferendumId, VoteChoice)
    VALUES (@Id, @UserId, @ReferendumId, @VoteChoice);
END
GO

CREATE OR ALTER PROCEDURE GetVotesByReferendumId
    @ReferendumId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT Id, UserId, ReferendumId, VoteChoice
    FROM Votes
    WHERE ReferendumId = @ReferendumId;
END
GO

CREATE OR ALTER PROCEDURE GetVotesByUserId
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT Id, UserId, ReferendumId, VoteChoice
    FROM Votes
    WHERE UserId = @UserId;
END
GO

CREATE OR ALTER PROCEDURE AddReferendumToOwner
    @OwnerId UNIQUEIDENTIFIER,
    @ReferendumId UNIQUEIDENTIFIER
AS
BEGIN
    INSERT INTO ReferendumOwners (UserId, ReferendumId)
    VALUES (@OwnerId, @ReferendumId)
END
GO

CREATE OR ALTER PROCEDURE RemoveReferendumFromOwner
    @OwnerId UNIQUEIDENTIFIER,
    @ReferendumId UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM ReferendumOwners
    WHERE UserId = @OwnerId AND ReferendumId = @ReferendumId
END
GO

CREATE OR ALTER PROCEDURE GetReferendumsOwnedByUser
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT ReferendumId
    FROM ReferendumOwners
    WHERE UserId = @UserId
END
GO

CREATE OR ALTER PROCEDURE GetAllUsers
AS
BEGIN
    SELECT Id, Name
    FROM Users
END
GO

CREATE OR ALTER PROCEDURE GetAllFromReferendumRequests
AS
BEGIN
    SELECT * FROM ReferendumRequests;
END;
GO

CREATE OR ALTER PROCEDURE AddToReferendumRequests
    @Id UNIQUEIDENTIFIER,
    @UserId UNIQUEIDENTIFIER,
    @Question NVARCHAR(500),
    @Details NVARCHAR(MAX),
    @ReferendumDate DATETIME
AS
BEGIN
    INSERT INTO ReferendumRequests (Id, UserId, Question, Details, ReferendumDate)
    VALUES (@Id, @UserId, @Question, @Details, @ReferendumDate);
END;
GO

CREATE OR ALTER PROCEDURE UpdateReferendumRequests
    @Id UNIQUEIDENTIFIER,
    @UserId UNIQUEIDENTIFIER,
    @Question NVARCHAR(500),
    @Details NVARCHAR(MAX),
    @ReferendumDate DATETIME
AS
BEGIN
    UPDATE ReferendumRequests
    SET UserId = @UserId, 
        Question = @Question, 
        Details = @Details, 
        ReferendumDate = @ReferendumDate
    WHERE Id = @Id;
END;
GO

CREATE OR ALTER PROCEDURE GetReferendumRequestsByUserId
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT * FROM ReferendumRequests
    WHERE UserId = @UserId;
END
GO

CREATE OR ALTER PROCEDURE GetReferendumRequestsById
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        Id,
        UserId,
        Question,
        Details,
        ReferendumDate
    FROM 
        ReferendumRequests
    WHERE 
        Id = @Id;
END;
GO