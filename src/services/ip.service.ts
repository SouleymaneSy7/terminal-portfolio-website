/**
 * ip.service.ts — fetch public IP address and geolocation data.
 *
 *
 * Docs: https://ipapi.co/api/?javascript
 */

import { IpResponseType } from "@/types"
import axios from "axios"

const IP_API_BASE_URL = "https://ipapi.co/json/"
const API_TIMEOUT = 10_000

export async function fetchIpInfo(): Promise<IpResponseType> {
  const { data } = await axios.get<IpResponseType>(IP_API_BASE_URL, {
    timeout: API_TIMEOUT,
  })

  if (data.error) {
    const reason = data.reason ?? "Unknown error"
    throw new Error(`Could not determine IP location: ${reason}`)
  }

  return data
}
