import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const revalidate = 1; //revalidate api every 1 second
export const dynamic = 'force-dynamic';

export const GET=async (request)=>{
    try {
        await connectToDB();
        const prompts=await Prompt.find({}).populate('creator');  
        return new Response(JSON.stringify(prompts),{status: 200})
    } catch (error) {
        return new Response('failed to fetch  prompts',{status:500})
    }
}