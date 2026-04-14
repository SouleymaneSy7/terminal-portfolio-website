/**
 * Currency conversion via frankfurter.dev — free, no API key required.
 * Supports 164 world currencies (ISO 4217).
 *
 * Docs: https://frankfurter.dev/docs/
 */

import { ApiRatesResponseType, ConvertResultType } from "@/types";
import axios from "axios";

const FRANKFURTER_API_URL = "https://api.frankfurter.dev";

export const convertService = {
  convert: async (from: string, to: string): Promise<ConvertResultType> => {
    const { data } = await axios.get<ApiRatesResponseType>(
      `${FRANKFURTER_API_URL}/v2/rates`,
      {
        params: {
          base: from.toUpperCase(),
          quotes: to.toUpperCase(),
        },
      },
    );

    if (!data || data.length === 0) {
      throw new Error("Aucune donnée retournée par l'API");
    }

    return data[0];
  },

  /** Fetch the full list of supported currencies with their names. */
  getCurrencies: async (): Promise<Record<string, string>> => {
    const { data } = await axios.get<Record<string, string>>(
      `${FRANKFURTER_API_URL}/v2/currencies`,
    );
    return data;
  },
};
