import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import notesRouter from './routers/notes.route.js';
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: `${process.env.CORS_ORIGIN}` || '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

app.use('/api/notes', notesRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

await connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error(`Failed to connect to the database: ${err.message}`);
});
