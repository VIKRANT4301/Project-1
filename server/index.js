/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { UserRouter } from './routes/user.js'; // User authentication routes
import  {UploadRouter} from './routes/upload.js'; // Assuming UploadRouter is correctly defined

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' })); // Increase the limit to 10MB
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:5174"], // Adjust based on your frontend URL
  credentials: true,
}));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/Register');
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', UserRouter); // User authentication routes
app.use('/api', UploadRouter); // Upload API route, assuming it's in the `upload.js` file

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
