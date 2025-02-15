import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Flim from './Modules/Flim.js';
import { getServer, getHealth, getNotFound } from './controllers/other.js'; // Adjust the path if needed

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit if DB connection fails
    }
};
connectDB();

// Use the imported controller
app.get("/", getServer);
app.get("/health", getHealth);

app.post("/flims", async (req, res) => {
    try {
        const { title, director, poster, releaseYear, language, rating } = req.body;

        const newFlim = new Flim({
            title,
            director,
            poster,
            releaseYear,
            language,
            rating
        });

        const savedFlim = await newFlim.save();

        return res.status(201).json({
            success: true,
            message: "Film Created",
            data: savedFlim,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating film",
            error: error.message
        });
    }
});

app.get("/flimById/:id", async (req, res) => {  // Add :id in the route
    try {
        const { id } = req.params;  // Correctly get id from params
        const flim = await Flim.findOne({ _id: id });

        if (flim) {
            return res.status(200).json({
                success: true,
                data: flim,
                message: "Film fetched successfully",
            });
        } else {
            return res.status(404).json({
                success: false,  // Fixed typo here
                data: null,
                message: "Film not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching film",
            error: error.message,
        });
    }
});

app.get("/films", async (req, res) => {  
    try {
        const films = await Flim.find(); // Fetch all films
        return res.status(200).json({
            success: true,
            data: films,
            message: "Films fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching films",
            error: error.message,
        });
    }
});


app.delete("/deleteById/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const flim = await Flim.deleteOne({ _id: id });
        return res.status(200).json({  // Changed status from 400 to 200
            success: true,
            message: "Film Deleted",
            data: flim,
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
            data: null,
        });
    }
});


// Handle 404 errors
app.get("*", getNotFound);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
