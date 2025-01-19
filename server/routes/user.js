/* eslint-disable no-undef */
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import User from "../models/User.js"; // Ensure you have a User model defined

const router = express.Router();

// Middleware
router.use(bodyParser.json({ limit: "10mb" }));

// Utility to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory to store uploaded images
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "User already exists" });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    await newUser.save();
    return res.json({ status: true, message: "Record registered" });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not registered" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "Password is incorrect" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: "5m",
    });

    // Set token in cookies
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

    return res.json({
      status: true,
      message: "Login Successfully",
      token,
      userName: user.username,
    });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Forgot Password Route
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

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
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="http://localhost:5174/forgotpassword/${token}">Reset Password</a>
             <p>This link will expire in 5 minutes.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent:", info.response);
      res.json({ status: true, message: "Email sent successfully" });
    });
  } catch (err) {
    console.error("Error in forgotpassword:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Upload Image Route
router.post("/api/upload", (req, res) => {
  const { base64 } = req.body;

  if (!base64) {
    return res.status(400).send({ message: "No image provided" });
  }

  const imageData = base64.split(";base64,").pop();
  const fileName = `${uuidv4()}.png`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  fs.writeFile(filePath, imageData, { encoding: "base64" }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Failed to save image" });
    }

    res.send({ message: "Image uploaded successfully", fileName });
  });
});

// Fetch Uploaded Images Route
router.get("/api/get-image", (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Failed to retrieve images" });
    }

    const imageUrls = files.map((file) => ({
      image: `http://localhost:3000/uploads/${file}`,
    }));

    res.send({ data: imageUrls });
  });
});

// Serve Uploaded Images
router.use("/uploads", express.static(UPLOAD_DIR));

export { router as UserRouter };
