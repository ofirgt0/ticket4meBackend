USE TICKET4U
GO

CREATE TABLE [dbo].[UsersVerify]
(
    [userName] [varchar](15) NOT NULL PRIMARY KEY,
    [verifyEmailCode] [varchar](50) NOT NULL,
    [verifyPhoneCode] [varchar](50) NOT NULL,
    [phoneCodeExpires] [date] NOT NULL,
    [emailCodeExpires] [date] NOT NULL
) 
GO

