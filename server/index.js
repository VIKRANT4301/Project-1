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
const PORT = process.env.PORT;

// Ensure PORT is set to avoid local execution
if (!PORT) {
  throw new Error("PORT is not defined. Ensure it is set in the environment variables.");
}

// Configure CORS to allow only the Vercel frontend URL globally
app.use(cors({
  origin: process.env.REACT_APP_API_URL, // Restrict access to Vercel frontend
  credentials: true,  // Allow credentials (cookies, authorization headers)
}));

// Increase payload size limit for incoming requests
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tlsAllowInvalidCertificates: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
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
app.use('/auth', UserRouter);
app.use('/api', UploadRouter);

// Start the server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on global server at port ${PORT}`));
}).catch((err) => {
  console.error("Failed to start server:", err);
});
