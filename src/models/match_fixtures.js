import mongoose from "mongoose";
import { matchFixturesCollectionName, teamsCollectionName, tournamentCollectionName } from "../common/constrants/db";

export const MatchSchema = new mongoose.Schema(
    {
        match_date: { type: timeStamp, require: true },
        venue: { type: String, require: true },
        home_team_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: teamsCollectionName
        },
        away_team_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: teamsCollectionName
        },
        home_score: {
            type: Number
        },
        away_score: {
            type: Number
        },
        tournament_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tournamentCollectionName,
        },
        match_status: {
            type: String
        }
    }
);

const MatchFixtures = mongoose.model(matchFixturesCollectionName, MatchSchema);