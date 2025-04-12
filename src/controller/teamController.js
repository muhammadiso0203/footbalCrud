import express from "express";
import mongoose from "mongoose";
import { Teams } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const Team = await Team.find();
        res.status(200).json(Team);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const Team = await Team.findById(id);
        if (!Team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json(Team);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.post("/", async (req, res) => {
    try {
        const { team_name, club_id, group_id, coach_name } = req.body;

        if (!team_name|| !club_id || !group_id || !coach_name) {
            return res.status(400).json({ message: "Barcha maydonlar to‘ldirilishi kerak" });
        }

        const newTeam = new Teams({ team_name, club_id, group_id, coach_name });
        await newTeam.save();

        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { team_name, club_id, group_id, coach_name } = req.body;

        if (!team_name || !club_id || !group_id || !coach_name) {
            return res.status(400).send('All fields are required');
        }

        const updatedTeam = await Teams.findByIdAndUpdate(
            id,
            { team_name, club_id, group_id, coach_name},
            { new: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json(updatedTeam);
    } catch (error) {
        res.status(500).json("Xatolik")
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTeam = await Teams.findByIdAndDelete(id);

        if (!deleteTeam) {
            return res.status(404).json("Team not found");
        }

        res.status(200).json("Team delete");
    } catch (error) {
        res.status(500).json("Xatolik yuz berdi");
    }
});