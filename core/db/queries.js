export const queries = {
  getAllUsers: "SELECT * FROM Users",
  addNewUser:
    "INSERT INTO Users (userName,userEmail,userPhone,userPassword,userPermission,picture) VALUES (@userName,@userEmail,@userPhone,@userPassword,@userPermission,@picture)",
  getUser: "SELECT * FROM Users WHERE userName = @userName",
  deleteUser: "DELETE FROM Users WHERE userName = @userName",
  updateUserByName:
    "UPDATE Users SET userEmail=@NewEmail,userPhone=@NewPhone WHERE userName = @name",
};
