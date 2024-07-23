# VoteMaster

## Overview

VoteMaster is a project designed to review skills related to C#, SQL, and TypeScript. The goal is to create a comprehensive voting application that includes user management, referendum management, eligibility management, and voting. Future enhancements will include adding a React Native application.

## Features

- **User Management**: Create and manage users.
- **Referendum Management**: Create and manage referendums.
- **Eligibility Management**: Manage user eligibility for referendums.
- **Voting**: Record and manage votes.

## Getting Started

### Prerequisites

- .NET SDK 8.0
- SQL Server

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ParsMaioris/VoteMaster.git
    cd votemaster
    ```

2. Set up the database:
    - Create a SQL Server database.
    - Update the connection string in `appsettings.json`.

3. Run the application:
    ```bash
    dotnet run
    ```

4. Navigate to `http://localhost:5086/swagger/index.html` to view the Swagger UI and explore the API endpoints.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.