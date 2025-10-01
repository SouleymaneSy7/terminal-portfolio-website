import axios from "axios";
import { JokeResponseType } from "@/types";

const JOKE_API_URL = "https://v2.jokeapi.dev/joke";

const jokeApi = axios.create({
  baseURL: JOKE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export const jokeService = {
  getRandomJoke: async (): Promise<JokeResponseType | undefined> => {
    try {
      const response = await jokeApi.get<JokeResponseType | undefined>(
        `/Programming?type=twopart`,
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error Fetching Joke: ", error);
    }
  },
};
