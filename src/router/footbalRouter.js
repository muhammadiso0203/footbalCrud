import { Router } from "express";
import * as Team from "../controller/index.js";

const router = Router();

router.get("/footbal", footbalController.findAll);
router.get("/footbal/:id", footbalController.findOne);
router.post("/footbal", footbalController.create);
router.put("/footbal/:id", footbalController.update);
router.delete("/footbal/:id", footbalController.delete);

export {router as footballRouter}