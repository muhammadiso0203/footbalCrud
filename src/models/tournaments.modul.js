import mongoose, { Mongoose } from "mongoose";
import { tournamentCollectionName } from "../common/constrants/db.js";

const tournamentSchema = new Mongoose.schema(
    {
        tourname_name: { type: String, reuqired: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        status: { type: String, required: true }
    }
);

export const Tournament = mongoose.model(tournamentCollectionName, tournamentSchema)