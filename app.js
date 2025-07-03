// require("dotenv").config();
// require("./config/database").connect();
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const app = express();

// app.use(express.json());

// // Logic goes here

// const User = require("./model/user");

// // Register
// app.post("/rgi", async (req, res) => {
//   // our register logic goes here...
//   try {
//     // Get user input
//     const { firstName, lastName, email, password } = req.body;
//     console.log("firstName !!!!!!", firstName);
//     // Validate user input
//     if (!(email && password && firstName && lastName)) {
//       return res.status(400).send("All input is required");
//     }

//     // check if user already exist
//     // Validate if user exist in our database
//     const oldUser = await User.findOne({ email });

//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login");
//     }

//     //Encrypt user password
//     encryptedUserPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       first_name: firstName,
//       last_name: lastName,
//       email: email.toLowerCase(), // sanitize
//       password: encryptedUserPassword,
//     });

//     // Create token
//     const token = jwt.sign(
//       { user_id: user._id, email },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "5h",
//       }
//     );
//     // save user token
//     user.token = token;

//     // return new user
//     res.status(201).json(user);
//   } catch (err) {
//     console.log(err);
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!(email && password)) {
//       return res.status(400).send("All input is required");
//     }

//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       const token = jwt.sign(
//         { user_id: user._id, email },
//         process.env.TOKEN_KEY,
//         {
//           expiresIn: "5h",
//         }
//       );

//       user.token = token;

//       return res.status(200).json(user);
//     }

//     return res.status(400).send("Invalid Credentials");
//   } catch (err) {
//     console.log(err);
//   }
// });
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// module.exports = app;
