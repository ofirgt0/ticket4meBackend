export const queries = {
  //users table
  getAllUsers: "SELECT * FROM Users",
  addNewUser:
    "INSERT INTO Users (userName,userEmail,userPhone,userPassword,userPermission,picture) VALUES (@userName,@userEmail,@userPhone,@userPassword,@userPermission,@picture)",
  getUser: "SELECT * FROM Users WHERE userName = @userName",
  deleteUser: "DELETE FROM Users WHERE userName = @userName",
  updateUserByName:
    "UPDATE Users SET userEmail=@NewEmail,userPhone=@NewPhone WHERE userName = @name",

  //usersVerify table
  addVerfiedUser:
    "INSERT INTO UsersVerify (userName,verifyEmailCode,verifyPhoneCode,emailCodeExpires,phoneCodeExpires) VALUES (@userName,@verifyEmailCode,@verifyPhoneCode,@emailCodeExpires,@phoneCodeExpires)",
  getUserVerifyInfo: "SELECT * FROM UsersVerify WHERE userName = @userName",
  updateVerifyInfo: "UPDATE UsersVerify SET verifyEmailCode=@verifyEmailCode, verifyPhoneCode=@verifyPhoneCode, emailCodeExpires=@emailCodeExpires, phoneCodeExpires=@phoneCodeExpires WHERE userName=@userName",
  removeUserInfo: "DELETE FROM UsersVerify WHERE userName=@userName",
};
