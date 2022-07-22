USE TICKET4U
GO

CREATE TABLE [dbo].[Users]
(
    [userName] [varchar](50) NOT NULL,
    [userEmail] [varchar](50) NOT NULL,
    [userPhone] [varchar](50) NOT NULL,
    [userPassword] [varchar](50) NOT NULL,
    [userPermission] [varchar](50) NOT NULL,
    [picture] [text] NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[userName] ASC
)
)