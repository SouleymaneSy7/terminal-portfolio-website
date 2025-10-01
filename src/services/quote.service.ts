import axios from "axios";
import { QuoteResponseType } from "@/types";

const QUOTE_API_URL = "https://api.adviceslip.com";

const quoteInstance = axios.create({
  baseURL: QUOTE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export const quoteService = {
  getRandomQuote: async (): Promise<QuoteResponseType | undefined> => {
    try {
      const response = await quoteInstance.get<QuoteResponseType | undefined>(
        `/advice`,
      );

      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error Fetching Quote :", error);
    }
  },
};
