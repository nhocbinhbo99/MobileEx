import { PHONES } from "../data/phones";
import { Phone } from "../types";

export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ||
  "https://6add7d25fa5e73d4ab2dfc52.mockapi.io"
).replace(/\/$/, "");

export const USING_API = API_URL !== "";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchPhone(id: string): Promise<Phone> {
  if (!USING_API) {
    await sleep(600);
    const p = PHONES.find((x) => x.id === id);
    if (!p) throw new Error("Khong tim thay san pham");
    return p;
  }

  try {
    const res = await fetch(`${API_URL}/phones/${id}`);
    if (!res.ok) throw new Error(`Loi server ${res.status}`);
    return (await res.json()) as Phone;
  } catch (err: unknown) {
    // fallback offline data
    await sleep(600);
    const fallback = PHONES.find((x) => x.id === id);
    if (fallback) return fallback;
    throw err;
  }
}
