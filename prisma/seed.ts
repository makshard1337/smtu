import { myNews } from "../lib/nnews";
import prisma from "../lib/db";

async function main() {
    const newsArray = await myNews()
    for (const newsData of newsArray) {
        await prisma.news.upsert({
            where: { title: newsData.title },
            update: {
                date: newsData.date,
                title: newsData.title,
                text: newsData.text,
                image: newsData.image,
            },
            create: {
                title: newsData.title,
                date: newsData.date,
                text: newsData.text,
                image: newsData.image,
            },
        });
        console.log(`Upserted news: ${newsData.title}`);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })