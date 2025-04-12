import express from "express";
import mongoose from "mongoose";
import * as TournamentGroup from "../models/tournament.groups.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const TournamentGroup = await TournamentGroup.find();
        res.status(200).json(TournamentGroup);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const TournamentGroup = await TournamentGroup.findById(id);
        if (!TournamentGroup) {
            return res.status(404).json({ message: "TournamentGroup not found" });
        }
        res.status(200).json(TournamentGroup);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.post("/", async (req, res) => {
    try {
        const { group_name, tournament_id, timestamps} = req.body;

        if (!group_name|| !tournament_id || !timestamps) {
            return res.status(400).json({ message: "Barcha maydonlar to‘ldirilishi kerak" });
        }

        const newTournamentGroup = new TournamentGroup({ team_name, club_id, group_id, coach_name });
        await newTournamentGroup.save();

        res.status(201).json(newTournamentGroup);
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { group_name, tournament_id, timestamps} = req.body;

        if (!group_name || !tournament_id || !timestamps) {
            return res.status(400).send('All fields are required');
        }

        const updatedTournamentGroup = await TournamentGroup.findByIdAndUpdate(
            id,
            { group_name, tournament_id, timestamps},
            { new: true }
        );

        if (!updatedTournamentGroups) {
            return res.status(404).json({ message: "TournamentGroup not found" });
        }

        res.status(200).json(updatedTournamentGroup);
    } catch (error) {
        res.status(500).json("Xatolik")
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTournamentGroup = await TournamentGroup.findByIdAndDelete(id);

        if (!deleteTournamentGroup) {
            return res.status(404).json("TournamentGroup not found");
        }

        res.status(200).json("TournamentGroup delete");
    } catch (error) {
        res.status(500).json("Xatolik yuz berdi");
    }
});