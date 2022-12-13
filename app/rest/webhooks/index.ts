import express from "express";
import stripeWebhookRouter from "./stripe/stripeWebhook";

const router = express.Router();

router.use("/stripe", stripeWebhookRouter);

export default router;
