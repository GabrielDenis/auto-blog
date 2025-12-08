import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js"

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// POST /auth/register
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, password: hashed }
        });

        res.json({ id: user.id, email: user.email });
    } catch (e) {
        console.error("Registration Error:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST /auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token });
});

export default router;
