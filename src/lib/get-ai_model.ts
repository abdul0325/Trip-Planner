import type { BaseChatModel } from "@langchain/core/language_models/chat_models";

export async function getChatModel(): Promise<BaseChatModel> {

  const { ChatGroq } = await import("@langchain/groq");

  return new ChatGroq({
    apiKey: process.env.AI_API_KEY,
    model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",

    temperature: 0.3,
    topP: 1,
  });
}