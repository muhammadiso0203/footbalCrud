import express from "express";
import { mongoose } from "mongoose";
import { Tournament } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const Tournament = await Tournament.find();
        res.status(200).json(Tournament);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const Tournament = await Tournament.findById(id);
        if (!Tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }
        res.status(200).json(Tournament);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.post("/", async (req, res) => {
    try {
        const { tournament_name, start_date, end_date, status } = req.body;

        if (!tournament_name|| !start_date || !end_date || !status) {
            return res.status(400).json({ message: "Barcha maydonlar to‘ldirilishi kerak" });
        }

        const newTournament = new Tournament({ tournament_name, start_date, end_date, status });
        await newTournament.save();

        res.status(201).json(newTournament);
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { tournament_name, start_date, end_date, status} = req.body;

        if (!tournament_name || !start_date || !end_date || !status) {
            return res.status(400).send('All fields are required');
        }

        const updatedTournament = await Tournament.findByIdAndUpdate(
            id,
            { tournament_name, start_date, end_date, status},
            { new: true }
        );

        if (!updatedTournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.status(200).json(updatedTournament);
    } catch (error) {
        res.status(500).json("Xatolik")
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTournament = await Tournament.findByIdAndDelete(id);

        if (!deleteTournament) {
            return res.status(404).json("Tournament not found");
        }

        res.status(200).json("Tournament delete");
    } catch (error) {
        res.status(500).json("Xatolik yuz berdi");
    }
});