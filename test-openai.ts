import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
    try {
        console.log('Testing OpenAI Key...');
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "Say hello" }],
            max_tokens: 10,
        });
        console.log('Success:', response.choices[0].message.content);
    } catch (error: any) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Details:', error.response.data);
        }
    }
}

test();
