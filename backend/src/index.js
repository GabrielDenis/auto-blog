import "dotenv/config"
import express from "express"
import router from "./routes/index.js"

const app = express()

app.use(express.json())

app.use("/api", router)

app.get("/", (req, res) => {
    res.send("API working")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})
