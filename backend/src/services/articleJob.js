import cron from "node-cron"
import { createNewArticle } from "./articleService.js"

const topics = [
    "The Future of AI",
    "React Hooks Explained",
    "Node.js Performance Tips",
    "Docker for Beginners",
    "Understanding Kubernetes",
    "Cloud Computing Trends",
    "Cybersecurity Best Practices",
    "Microservices Architecture",
    "WebAssembly Introduction",
    "GraphQL vs REST"
]

/**
 * Initializes the automated article generation system.
 * Sets up a daily cron job (midnight) and triggers an immediate generation
 * to ensure the database is populated on startup.
 */
export function startArticleJob() {
    // Run every day at midnight: "0 0 * * *"
    console.log("Initializing Article Cron Job (Daily)...")

    cron.schedule("0 0 * * *", async () => {
        console.log("Running Daily Article Generation Job...")
        try {
            const randomTopic = topics[Math.floor(Math.random() * topics.length)]
            const article = await createNewArticle(randomTopic)
            console.log(`[Job] Created article: "${article.title}" (ID: ${article.id})`)
        } catch (error) {
            console.error("[Job] Failed to generate article:", error)
        }
    })

    // Run immediately for initial population
    console.log("Running immediate initial article generation...")
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    createNewArticle(randomTopic)
        .then(a => console.log(`[Init] Created article: "${a.title}"`))
        .catch(e => console.error(`[Init] Failed:`, e))
}
