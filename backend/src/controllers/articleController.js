import { createNewArticle } from "../services/articleService.js"

export async function createArticle(req, res) {
  try {
    const { topic } = req.body

    if (!topic) {
      return res.status(400).json({ error: "Missing topic" })
    }

    const article = await createNewArticle(topic)

    res.json(article)
  } catch (error) {
    console.error("Generator Error full object:", error);
    console.error("Generator Error Message:", error.message);
    if (error.meta) console.error("Meta:", error.meta);
    if (error.cause) console.error("Cause:", error.cause);
    if (error.body) console.error("Error Body:", error.body);
    res.status(500).json({ error: "Error generating article" })
  }
}
