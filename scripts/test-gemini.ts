import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function test() {
    try {
        const modelName = "gemini-2.5-flash"; 
        console.log(`Testing with model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say hello");
        console.log('Success:', result.response.text());
    } catch (error: any) {
        console.error('Error Status:', error.status);
        console.error('Error Message:', error.message);
    }
}

test();
