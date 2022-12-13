import express from "express";
import webhookRouter from "./webhooks";

const router = express.Router();

router.use("/webhooks", webhookRouter);

export default router;
