import prisma from "../lib/prisma.js"
import { generateArticleHF } from "./hfGenerator.js"

export async function createNewArticle(topic) {
    const { title, content } = await generateArticleHF(topic)

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
