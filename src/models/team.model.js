import mongoose from "mongoose";
import { teamCollectionName, teamCollectionName, tournamentGroupsCollectionName } from "../common/constrants/db.js";

const teamsSchema = new mongoose.Schema(
    {
        team_name: { type: string, require: true },
        club_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: teamCollectionName,
            required: true
        },
        group_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tournamentGroupsCollectionName,
            require: true
        },
        coach_name: { type: String, require: true }
    }
);

export const Teams = mongoose.model(teamCollectionName, teamsSchema);
