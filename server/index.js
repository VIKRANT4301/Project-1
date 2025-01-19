/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { UserRouter } from './routes/user.js'; // User authentication routes


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json(('')));
app.use(cors({
  origin: ["http://localhost:5174"], // Adjust based on your frontend URL
  credentials: true,
}));

app.use('/auth', UserRouter);

app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(UserRouter);

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/Register');
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', UserRouter);


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
