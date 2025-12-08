import "dotenv/config"
import prisma from "./src/lib/prisma.js"

async function main() {
    try {
        const articles = await prisma.article.findMany()
        console.log("Articles found:", articles.length)
        console.log(JSON.stringify(articles, null, 2))
    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
