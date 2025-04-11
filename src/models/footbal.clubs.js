import mongoose from "mongoose";
import { teamCollectionName} from "../common/constrants/db.js";

const football_clubs = new mongoose.Schema(
    {
        club_name: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        founded_year: { type: Number, required: true }
    }
);

export const Team = mongoose.model(teamCollectionName, teamSchema)