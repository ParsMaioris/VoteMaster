CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);

CREATE TABLE Referendums (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL
);

CREATE TABLE Votes (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    UserId UNIQUEIDENTIFIER NOT NULL,
    ReferendumId UNIQUEIDENTIFIER NOT NULL,
    VoteChoice BIT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (ReferendumId) REFERENCES Referendums(Id)
);

CREATE TABLE Eligibilities (
    UserId UNIQUEIDENTIFIER NOT NULL,
    ReferendumId UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY (UserId, ReferendumId),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (ReferendumId) REFERENCES Referendums(Id)
);

CREATE TABLE ReferendumOwners (
    UserId UNIQUEIDENTIFIER NOT NULL,
    ReferendumId UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY (UserId, ReferendumId),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (ReferendumId) REFERENCES Referendums(Id)
);

CREATE TABLE ReferendumRequests (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Question NVARCHAR(500) NOT NULL,
    Details NVARCHAR(MAX),
    ReferendumDate DATETIME NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE UserDetails (
    UserId UNIQUEIDENTIFIER PRIMARY KEY,
    PasswordHash NVARCHAR(255) NULL,
    Email NVARCHAR(255) NULL,
    PhoneNumber NVARCHAR(20) NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE ReferendumDetails (
    ReferendumId UNIQUEIDENTIFIER PRIMARY KEY,
    PublicationDate DATETIME NOT NULL,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (ReferendumId) REFERENCES Referendums(Id),
    CONSTRAINT CHK_Status CHECK (Status IN ('Draft', 'Published', 'Voting Closed'))
);