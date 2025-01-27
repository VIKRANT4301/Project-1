

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv"; // Load environment variables
import User from "../models/User.js"; // Ensure you have a User model defined

dotenv.config(); // Load .env file

const UserRouter = express.Router();

// CORS configuration for local and global deployment
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL || "http://localhost:5174",
  process.env.REACT_APP_API_URL || "https://project-1-sage-phi.vercel.app/"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,  // Allow credentials (cookies, authorization headers)
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

UserRouter.use(cors(corsOptions));

// Signup Route
UserRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    await newUser.save();
    return res.status(201).json({ status: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

    return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      userName: user.username,
    });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Forgot Password Route
UserRouter.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });

    const frontendURL = process.env.REACT_APP_API_URL || "http://localhost:5174";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Reset Password",
      html: `
         <p>You requested a password reset. Click the link below to reset your password:</p>
         <a href="${frontendURL}/resetpassword/${token}">Reset Password</a>
         <p>This link will expire in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Error in forgotpassword:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Verify Token Route
UserRouter.post("/verify-token", async (req, res) => {
  const { token } = req.body;
  try {
    // eslint-disable-next-line no-unused-vars
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return res.status(200).json({ status: true });
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(400).json({ status: false, message: "Expired or invalid token" });
  }
});

// Send Security Alert Email
UserRouter.post("/send-alert", async (req, res) => {
  const { message, email } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Security Alert: Unauthorized Image Download Attempt",
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Alert email sent." });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send alert email." });
  }
});

export default UserRouter;