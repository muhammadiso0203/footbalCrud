import express from "express";
import { Team } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const football_clubs = await Team.find();
        res.status(200).json(football_clubs);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const football_club = await Team.findById(id);
        if (!football_club) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.status(200).json(football_club);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.post("/", async (req, res) => {
    try {
        const { club_name, city, country, founded_year } = req.body;

        if (!club_name || !city || !country || !founded_year) {
            return res.status(400).json({ message: "Barcha maydonlar to‘ldirilishi kerak" });
        }

        const newClub = new Team({ club_name, city, country, founded_year });
        await newClub.save();

        res.status(201).json(newClub);
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { club_name, city, country, founded_year } = req.body;

        if (!club_name || !city || !country || !founded_year) {
            return res.status(400).send('All fields are required');
        }

        const updatedFootballClub = await Team.findByIdAndUpdate(
            id,
            { club_name, city, country, founded_year },
            { new: true }
        );

        if (!updatedFootballClub) {
            return res.status(404).json({ message: "Club not found" });
        }

        res.status(200).json(updatedFootballClub);
    } catch (error) {
        res.send(500).json("Xatolik")
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteClub = await Team.findByIdAndDelete(id);

        if (!deleteClub) {
            return res.status(404).json("Club not found");
        }

        res.status(200).json("Club delete");
    } catch (error) {
        res.status(500).json("Xatolik yuz berdi");
    }
});

export default router;
