import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.OPENROUTER_API_KEY;

async function testKey() {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-5.2",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Yo, do you actually work?" }
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

    console.log(
      "OpenRouter responded:",
      response.data.choices[0].message.content
    );

  } catch (err: any) {
    console.error("OpenRouter error:", err.response?.data || err.message);
  }
}

testKey();
