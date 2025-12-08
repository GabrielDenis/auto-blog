import "dotenv/config"
import express from "express"
import cors from "cors"
import router from "./routes/index.js"
import { startArticleJob } from "./services/articleJob.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", router)

app.get("/", (req, res) => {
    res.send("AutoBlog API Running")
})

const PORT = process.env.PORT || 3001

startArticleJob()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
