import express from "express";
import actions from "../controllers/scheduler-actions";

var router = express.Router();

router.post("/scheduler/actions/start", actions.start);
router.post("/scheduler/actions/stop", actions.stop);
router.get("/scheduler/actions/refresh", actions.refresh);

export default router;