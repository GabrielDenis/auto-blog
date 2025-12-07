import { Router } from "express"
import articleRoutes from "./articleRoutes.js"
import authRoutes from "./authRoutes.js"

const router = Router()

router.use("/articles", articleRoutes)
router.use("/auth", authRoutes)

export default router
