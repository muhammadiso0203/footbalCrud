import mongoose from "mongoose";
import { tournamentCollectionName, tournamentGroupsCollectionName } from "../common/constrants/db";
import { timeStamp } from "console";

const TournamentGroupSchema = new mongoose.Schema(
    {
        group_name: { type: String, require: true },
        tournament_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tournamentCollectionName,
            reuired: true
        },
        timestamps: true
    }
);

const TournamentGroup = mongoose.model(tournamentGroupsCollectionName, TournamentGroupSchema);