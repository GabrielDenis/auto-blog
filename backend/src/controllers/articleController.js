import { createNewArticle } from "../services/articleService.js"

/**
 * Handles the creation of a new article via the API.
 * Triggered by the "Generate" button or external requests.
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function createArticle(req, res) {
  try {
    const { topic } = req.body

    if (!topic) {
      return res.status(400).json({ error: "Missing topic" })
    }

    const article = await createNewArticle(topic)

    res.json(article)
  } catch (error) {
    console.error("Error generating article:", error.message);
    res.status(500).json({ error: "Error generating article" })
  }
}
