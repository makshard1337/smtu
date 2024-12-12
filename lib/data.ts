import { unstable_noStore } from "next/cache";
import prisma from "../lib/db";

export async function getAllNews() {
    unstable_noStore();
    try{
        console.log("getAllNews");
        const data = await prisma.news.findMany();
        return data;
    }   catch (error) {
        console.error("Database Error: ", error);
        throw new Error("Failed to fetch employee data.");
    }
    
}
