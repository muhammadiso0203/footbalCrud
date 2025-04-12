import { Router } from "express";
import { MatchFixture } from "../controller/index.js";

const router = Router();

router.get("/match_fixtures", matchFixtureController.findAll);
router.get("/match_fixtures/:id", matchFixtureController.findOne);
router.post("/match_fixtures", matchFixtureController.create);
router.put("/match_fixtures/:id", matchFixtureController.update);
router.delete("/match_fixtures/:id", matchFixtureController.delete);

export {router as matchFixturesRouter}