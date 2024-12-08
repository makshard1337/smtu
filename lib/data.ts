import prisma from "./db";
//import { news } from '@prisma/client';

export async function getAllNews() {
    try {
        console.log('getAllNews');
        const data = await prisma.news.findMany();
        return data;


    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Failed to fetch employee data");
    }

}
