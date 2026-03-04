import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
    res.json({ success: true, message: "API v1 working"});
});

export default router;