import { HfInference } from "@huggingface/inference"

const hf = new HfInference(process.env.HF_TOKEN)

/**
 * Generates an article using the HuggingFace Inference API.
 * Uses a robust chat completion model (Phi-3) to create content based on the topic.
 * 
 * @param {string} topic - The subject of the article to generate.
 * @returns {Promise<{title: string, content: string}>} The generated article data.
 */
export async function generateArticleHF(topic) {
    const prompt = `
  Write a complete article in English about the topic: "${topic}".
  Requirements:
  - An attractive title
  - An article of at least 300 words
  - Clear and professional style
  - Do not repeat instructions
  `

    let title = ""
    let content = ""

    try {
        // We use chatCompletion as it's more reliable for instruction-following models
        const res = await hf.chatCompletion({
            model: "microsoft/Phi-3-mini-4k-instruct",
            messages: [
                { role: "system", content: "You are a helpful blog writer." },
                { role: "user", content: prompt }
            ],
            max_tokens: 500,
            temperature: 0.7
        })
        const text = res.choices[0].message.content

        // Parse the response to extract title and content
        const lines = text.split("\n").filter(l => l.trim() !== "")
        title = lines[0] ? lines[0].replace(/title[:]?/i, "").replace(/^#+\s*/, "").replace(/"/g, "").trim() : "Generated Article"
        content = lines.slice(1).join("\n").trim() || text
    } catch (err) {
        // Fallback mechanism to ensure service continuity even if external API fails
        console.warn("HF Inference failed, falling back to mock data:", err.message)
        title = `Mock Article: ${topic}`
        content = `This is a simulated article about ${topic}. The HuggingFace Inference API could not be reached (likely due to free tier limits or model unavailability). Please check your HF_TOKEN or try a different model to enable real generation.`
    }

    return {
        title,
        content
    }
}
