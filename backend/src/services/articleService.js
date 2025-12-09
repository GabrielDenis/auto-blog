import prisma from "../lib/prisma.js"
import { generateArticleOpenRouter } from "./openRouterGenerator.js"

export async function createNewArticle(topic) {
    const { title, content } = await generateArticleOpenRouter(topic)

    const article = await prisma.article.create({
        data: {
            title,
            content,
            topic,
            published: true // Auto-publish for now
        }
    })

    return article
}
