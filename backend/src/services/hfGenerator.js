import { HfInference } from "@huggingface/inference"

const hf = new HfInference(process.env.HF_TOKEN)

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
        const lines = text.split("\n").filter(l => l.trim() !== "")
        title = lines[0] ? lines[0].replace(/title[:]?/i, "").replace(/^#+\s*/, "").replace(/"/g, "").trim() : "Generated Article"
        content = lines.slice(1).join("\n").trim() || text
    } catch (err) {
        console.warn("HF Inference failed, using mock data. Error:", err.message)
        title = `Mock Article: ${topic}`
        content = `This is a simulated article about ${topic}. The HuggingFace Inference API could not be reached (likely due to free tier limits or model unavailability). Please check your HF_TOKEN or try a different model.`
    }

    return {
        title,
        content
    }
}
