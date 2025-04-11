import mongoose from "mongoose";
import { playersCollectionName, teamCollectionName } from "../common/constrants/db";

export const playerSchema = new mongoose.Schema(
    {
        full_name: { type: String, require: true },
        date_of_birth: { type: Date, require: true },
        position: { type: StaticRange, require: true },
        team_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: teamCollectionName,
            require: true
        },
        jersey_number: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        }
    }
);

const playerSchema = mongoose.model(playersCollectionName, playerSchema)