import express from "express";
import mongoose from "mongoose";
import * as players from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const players = await players.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const players = await players.findById(id);
        if (!players) {
            return res.status(404).json({ message: "Players not found" });
        }
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.post("/", async (req, res) => {
    try {
        const { full_name, date_of_birth, position, team_id, jersey_number } = req.body;

        if (!full_name|| !date_of_birth || !position || !team_id || jersey_number) {
            return res.status(400).json({ message: "Barcha maydonlar to‘ldirilishi kerak" });
        }

        const newPlayers = new Team({ full_name, date_of_birth, position, team_id, jersey_number});
        await newPlayers.save();

        res.status(201).json(newPlayers);
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, date_of_birth, position, team_id, jersey_number } = req.body;

        if (!full_name || !date_of_birth || !position || !team_id || !jersey_number) {
            return res.status(400).send('All fields are required');
        }

        const updatedPlayers = await updatedPlayers.findByIdAndUpdate(
            id,
            { full_name, date_of_birth, position, team_id, jersey_number},
            { new: true }
        );

        if (!updatedPlayers) {
            return res.status(404).json({ message: "Players not found" });
        }

        res.status(200).json(updatedPlayers);
    } catch (error) {
        res.status(500).json("Xatolik")
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletePlayers = await players.findByIdAndDelete(id);

        if (!deletePlayers) {
            return res.status(404).json("Player not found");
        }

        res.status(200).json("Player  delete");
    } catch (error) {
        res.status(500).json("Xatolik yuz berdi");
    }
});

