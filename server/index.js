/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import UserRouter from './routes/user.js';  // User authentication routes
import UploadRouter from './routes/upload.js'; // Upload API routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

// Ensure critical environment variables are set
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined. Ensure it is set in the environment variables.");
}

// Allowed origins for CORS
const allowedOrigins = [
  "https://project-1-sage-phi.vercel.app",
  "http://localhost:5174",
];

// Configure CORS with proper error handling
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,  // Allow credentials (cookies, authorization headers)
}));

// Increase payload size limits for JSON and URL-encoded requests
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {

      tlsAllowInvalidCertificates: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1); // Exit process on failure
  }
};

// Middleware to log incoming request origins for debugging
app.use((req, res, next) => {
  console.log(`Incoming request from: ${req.headers.origin || 'unknown origin'}`);
  next();
});

// API Routes
app.use('/auth', UserRouter);
app.use('/api', UploadRouter);

// Global error handler to catch unexpected errors
app.use((err, req, res) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server only if MongoDB connection succeeds
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode at port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to start server:", err);
});
