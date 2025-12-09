
export async function generateArticleOpenRouter(topic) {
    const apiKey = process.env.OPENROUTER_API_KEY
    const model = process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-exp:free"

    if (!apiKey) {
        console.warn("OPENROUTER_API_KEY is missing. Using Mock Data.")
        return getMockArticle(topic)
    }

    const prompt = `
  Write a complete article in English about the topic: "${topic}".
  Requirements:
  - An attractive title
  - An article of at least 300 words
  - Clear and professional style
  - Do not repeat instructions
  - Return ONLY the article content, starting with the Title.
  `

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000", // Optional, required by some free models for rankings
                "X-Title": "AutoBlog" // Optional
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "user", content: prompt }
                ]
            })
        })

        if (!response.ok) {
            throw new Error(`OpenRouter API Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        const text = data.choices[0]?.message?.content || ""

        const lines = text.split("\n").filter(l => l.trim() !== "")
        const title = lines[0] ? lines[0].replace(/title[:]?/i, "").replace(/^#+\s*/, "").trim() : "Generated Article"
        const content = lines.slice(1).join("\n").trim() || text

        return { title, content }

    } catch (err) {
        console.warn("OpenRouter Inference failed, using mock data. Error:", err.message)
        return getMockArticle(topic)
    }
}

function getMockArticle(topic) {
    return {
        title: `Mock Article: ${topic} (Fallback)`,
        content: `This is a simulated article about ${topic}. The OpenRouter API could not be reached or failed. \n\nReason: API Key missing or Model Unavailable.\n\nPlease check your OPENROUTER_API_KEY in backend/.env.`
    }
}
