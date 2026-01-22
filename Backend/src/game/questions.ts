import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.OPENROUTER_API_KEY;

export async function generateQ(prompt: string) {
    if (!key){
        console.log("Couldnt find key, but got request")
    }
    try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "openai/gpt-5.2",
            messages: [
              { role: "system", content: 
                "You are a trivia question generator, randomize, with the correct answer ready. No asterisks" },
              { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 50
          },
          {
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json"
            }
          }
        );

        return response.data.choices[0].message.content;
    } catch (err: any) {
        return "Couldn't fetch question.."
    }
    
}