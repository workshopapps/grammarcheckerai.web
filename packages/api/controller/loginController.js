// const { userCollection } = require("../database/models/userSchema"); 
// const { response, authResponse } = require("../utilities/response");

// async function login(req, res) {
//   // retrieve the email and password
//   const { email, password } = req.body;

//   let user = await userCollection.findOne({email: email});
// console.log(user);
//   if (!user) {
//     return res.status(401).json({ msg: `User with email ${email} does not exist.` });
//   }
//   console.log(email, password, user);
//   // comparing password
//   const validPassword = await user.comparePassword(password);

//   if (!validPassword) {
//     return res.status(401).json({ msg: "Invalid email or password" });
//   }
  
//   return res.status(200).json(
//     response({
//       success: true,
//       message: "User login successfully",
//       data: authResponse(user),
//     })
//   );
// }
// module.exports = { login };
