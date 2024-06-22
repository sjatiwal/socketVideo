const pool = require("../config/connection");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// User Registration
exports.registerUser = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const { registerName, registerEmail, registerPhoneNo, registerPassword } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(registerPassword, 10);
    const newUser = {
      username: registerName,
      email: registerEmail,
      phoneNo: registerPhoneNo,
      password: hashedPassword,
      userrole: "user",
    };
    const insertUser =
      "INSERT INTO users (username, email, phoneNo, password, userrole) VALUES (?, ?, ?, ?, ?)";
    const values = [
      newUser.username,
      newUser.email,
      newUser.phoneNo,
      newUser.password,
      newUser.userrole,
    ];

    pool.query(insertUser, values, (insertError, result) => {
      if (insertError) {
        console.error("Error inserting user data: " + insertError);
      } else {
        console.log("User data inserted successfully");

        const user_id = result["insertId"];
        // Create a JWT token with user details
        const token = jwt.sign(
          { id: user_id },
          process.env.SECRET_KEY || "defaultSecretKey",
          { expiresIn: "1h" }
        );
        newUser.password = undefined;

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ user: [newUser], token });
      }
    });
  } catch (err) {
    console.log(err, "Registration");
  }
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { loginEmail, loginPassword } = req.body;

  const checkLoginSQL = "SELECT * FROM users WHERE email = ?";

  pool.query(checkLoginSQL, [loginEmail], async (selectError, user) => {
    if (selectError) {
      console.error("Error checking login data: " + selectError);
    } else {
      if (user.length === 1) {
        const match = await bcrypt.compare(loginPassword, user[0].password);
        if (match) {
          const user_id = user[0].user_id;
          // Create a JWT token with user details
          const token = jwt.sign(
            {
              id: user_id,
            },
            process.env.SECRET_KEY || "defaultSecretKey",
            { expiresIn: "1h" }
          );

          user[0].password = undefined;

          res
            .status(200)
            .cookie("token", token, {
              httpOnly: true,
              secure: false,
              domain: "localhost",
            })
            .json({ user, token });
        }
      } else {
        console.log("Login failed. Invalid credentials.");
      }
    }
  });
});

// user Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const checkLoginSQL = "SELECT * FROM users WHERE user_id=?";

  pool.query(checkLoginSQL, [req.user.user_id], (selectError, user) => {
    if (selectError) {
      console.error("Error checking login data: " + selectError);
    } else {
      if (user.length === 1) {
        const user_id = user[0].user_id;
        // Create a JWT token with user details
        const token = jwt.sign(
          {
            id: user_id,
          },
          process.env.SECRET_KEY || "defaultSecretKey",
          { expiresIn: "1h" }
        );

        user[0].password = undefined;

        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            secure: false,
            domain: "localhost",
          })
          .json({ user, token });
      } else {
        console.log("Loading failed");
      }
    }
  });
});

//GET ALL USERS
exports.getAllUsers = catchAsyncError(async (req, res, _next) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const checkLoginSQL = `
    SELECT user_id, username, phoneNo
    FROM users
    WHERE user_id != ?;
  `;
  pool.query(checkLoginSQL, [req.user.user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ users: results });
  });
});

// Logout User
exports.logoutUser = catchAsyncError(async (_req, res, _next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User Logged out",
  });
});
