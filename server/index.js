/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import UserRouter from './routes/user.js'; // User authentication routes
import UploadRouter from './routes/upload.js'; // Upload API routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse the allowed origins from the environment variable (comma-separated)
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

// Configure CORS to allow frontend origins dynamically
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allow credentials (cookies, authorization headers)
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Increase payload size limit for incoming requests
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Define a single connection function to prevent duplicate connections
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tlsAllowInvalidCertificates: true,
      connectTimeoutMS: 30000,            // Increase timeout for better debugging
      socketTimeoutMS: 45000,              // Increase socket timeout
      serverSelectionTimeoutMS: 5000,  // Allow invalid SSL certificates if needed
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process on failure
  }
};

// Middleware to log incoming request origins for debugging
app.use((req, res, next) => {
  console.log('Incoming request from:', req.headers.origin);
  next();
});

// Routes
app.use('/auth', UserRouter); // User authentication routes
app.use('/api', UploadRouter); // Upload API routes

// Start the server after connecting to the database
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((err) => {
  console.error("Failed to start server:", err);
});
