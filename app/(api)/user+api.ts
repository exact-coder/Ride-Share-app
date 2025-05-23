import { neon } from "@neondatabase/serverless";



export async function POST(request: Request) {
    const sql = neon (`${process.env.DATABASE_URL}`);
    const {name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
        return Response.json({error: "Missing required fields"}, {status: 400})
    }

}


// Your working length 2.14min  