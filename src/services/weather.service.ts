import axios from "axios";

const WEATHER_API_URL = "https://wttr.in";

const weatherApi = axios.create({
  baseURL: WEATHER_API_URL,
});

export const weatherService = {
  getWeather: async (city: string) => {
    try {
      const response = await weatherApi.get(`${encodeURIComponent(city)}?ATm`, {
        params: {
          lang: "en",
        },
        responseType: "text",
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`City "${city}" not found`);
        }
        if (error.code === "ECONNABORTED") {
          throw new Error("Request timeout");
        }
      }
      throw new Error("Failed to fetch weather");
    }
  },
};
