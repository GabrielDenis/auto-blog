import express from "express";
import prisma from "../lib/prisma.js"
import { generateArticle } from "../services/aiClient.js";
import { authRequired } from "../middleware/authMiddleware.js";

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
router.post("/generate", authRequired, async (req, res) => {
    const generated = await generateArticle();

    const article = await prisma.article.create({
        data: {
            title: generated.title,
            content: generated.content
        }
    });

    res.json(article);
});

export default router;
