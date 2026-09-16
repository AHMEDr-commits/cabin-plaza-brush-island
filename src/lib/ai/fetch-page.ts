import { createServerFn } from "@tanstack/react-start";

export const fetchPageText = createServerFn({ method: "POST" })
  .validator((input: { url: string }) => input)
  .handler(async ({ data }) => {
    try {
      const url = new URL(data.url);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return { ok: false as const, error: "Only http(s) URLs can be fetched." };
      }
      const res = await fetch(url.toString(), {
        headers: { "User-Agent": "Loreweave/1.0 (user-initiated page read)" },
        redirect: "follow",
      });
      if (!res.ok) return { ok: false as const, error: `Page returned ${res.status}.` };
      const html = (await res.text()).slice(0, 400_000);
      const title = (html.match(/<title[^>]*>([^<]+)<\/title>/i) ?? [])[1]?.trim() ?? url.hostname;
      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&/g, "&")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 40_000);
      return { ok: true as const, title, url: url.toString(), text };
    } catch {
      return { ok: false as const, error: "Could not fetch that page." };
    }
  });
