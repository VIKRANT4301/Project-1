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
const PORT = process.env.PORT || 3004; // Default to 3004 if PORT isn't defined

// Ensure PORT is set for local and production environments
if (!PORT) {
  throw new Error("PORT is not defined. Ensure it is set in the environment variables.");
}

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL || "http://localhost:5174",  // Local environment
  process.env.REACT_APP_API_URL || "https://project-1-sage-phi.vercel.app/",  // Production frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,  // Allow credentials (cookies, authorization headers)
}));

// Increase payload size limit for incoming requests
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// MongoDB connection
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

// Routes for user authentication and uploads
app.use('/auth', UserRouter);
app.use('/api', UploadRouter);

// Start the server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${process.env.NODE_ENV} server at port ${PORT}`));
}).catch((err) => {
  console.error("Failed to start server:", err);
});
