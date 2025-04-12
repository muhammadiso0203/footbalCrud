import express from "express";
import { mongoose } from "mongoose";
import {MatchFixtures} from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const MatchFixtures = await MatchFixtures.find();
        res.status(200).json(MatchFixtures);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const MatchFixtures = await MatchFixtures.findById(id);
        if (!MatchFixtures) {
            return res.status(404).json({ message: "Match fixtures not found" });
        }
        res.status(200).json(MatchFixtures);
    } catch (error) {
        res.status(500).json("Xatolik");
    }
});

router.post("/", async (req, res) => {
    try {
        const { match_date, venue, home_team_id, away_team_id, home_score, away_score, tournament_id, match_status } = req.body;

        if (!match_date|| !venue || !home_team_id || !away_team_id || home_score || away_score || tournament_id || match_status) {
            return res.status(400).json({ message: "Barcha maydonlar to‘ldirilishi kerak" });
        }

        const newMatchFixture = new MatchFixtures({ match_date, venue, home_team_id, home_score, away_score, tournament_id, match_status });
        await newMatchFixture.save();

        res.status(201).json(newMatchFixture);
    } catch (error) {
        res.status(500).json({ message: "Xatolik yuz berdi" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { match_date, venue, home_team_id, away_team_id, home_score, away_score, tournament_id, match_status } = req.body;

        if (!match_date || !venue || !home_team_id || !away_team_id || home_score || away_score || tournament_id || match_status) {
            return res.status(400).send('All fields are required');
        }

        const updatedMatchFixture = await MatchFixtures.findByIdAndUpdate(
            id,
            { match_date, venue, home_team_id, away_team_id, home_score, away_score, tournament_id, match_status},
            { new: true }
        );

        if (!updatedMatchFixture) {
            return res.status(404).json({ message: "MatchFixture not found" });
        }

        res.status(200).json(updatedMatchFixture);
    } catch (error) {
        res.status(500).json("Xatolik")
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletematchFixture = await MatchFixtures.findByIdAndDelete(id);

        if (!deletematchFixture) {
            return res.status(404).json("MatchFixture not found");
        }

        res.status(200).json("MatchFixture delete");
    } catch (error) {
        res.status(500).json("Xatolik yuz berdi");
    }
});
