import express from "express";
import prisma from "../lib/prisma.js";
import { authRequired } from "../middleware/authMiddleware.js";
import { createArticle } from "../controllers/articleController.js";

const router = express.Router();

// GET /articles
router.get("/", async (req, res) => {
    const articles = await prisma.article.findMany({
        orderBy: { createdAt: "desc" }
    });
    res.json(articles);
});

// GET /articles/:id
router.get("/:id", async (req, res) => {
    const article = await prisma.article.findUnique({
        where: { id: Number(req.params.id) }
    });

    if (!article) return res.status(404).json({ error: "Not found" });

    res.json(article);
});

// POST /articles/generate (protegida con login)
router.post("/generate", authRequired, createArticle);

export default router;
