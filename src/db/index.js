import { connect } from "mongoose";
import { config } from "../config/index.js";

export async function mongoConnection (){
    try {
        await connect(config.db.url)
        console.log(`Mongo ulandi`);
    } catch (error) {
        console.error(`Mongo ulanishda xatolik`)
        process.exit(1)
    }
}