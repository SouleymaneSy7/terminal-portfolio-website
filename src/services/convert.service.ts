/**
 * Currency conversion via frankfurter.dev — free, no API key required.
 * Supports 168 world currencies (ISO 4217).
 *
 * Docs: https://frankfurter.dev/docs/
 */

import { ApiRatesResponseType, ConvertResultType } from "@/types"
import axios from "axios"

const FRANKFURTER_API_URL = "https://api.frankfurter.dev"

let cachedCurrencies: Record<string, { name: string; symbol: string }> | null = null

export const convertService = {
  convert: async (from: string, to: string): Promise<ConvertResultType> => {
    const { data } = await axios.get<ApiRatesResponseType>(`${FRANKFURTER_API_URL}/v2/rates`, {
      params: {
        base: from.toUpperCase(),
        quotes: to.toUpperCase(),
      },
    })

    if (!data || data.length === 0) {
      throw new Error("No data return from API")
    }

    return data[0]
  },

  /** Fetch the full list of supported currencies with names AND symbols */
  getCurrencies: async (): Promise<Record<string, { name: string; symbol: string }>> => {
    if (cachedCurrencies !== null) {
      return cachedCurrencies
    }

    const { data } = await axios.get<
      Array<{
        iso_code: string
        name: string
        symbol: string
      }>
    >(`${FRANKFURTER_API_URL}/v2/currencies`)

    cachedCurrencies = data.reduce(
      (acc, currency) => {
        if (currency.iso_code && currency.name) {
          acc[currency.iso_code] = {
            name: currency.name,
            symbol: currency.symbol || "",
          }
        }
        return acc
      },
      {} as Record<string, { name: string; symbol: string }>,
    )

    return cachedCurrencies
  },
}
