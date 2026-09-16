import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fetch-page-fGZyFQol.js
var fetchPageText_createServerFn_handler = createServerRpc({
	id: "b08d9cb8b5c50a921bb70906a183814a5a2e2498c613b7f84686fd0dd45b4388",
	name: "fetchPageText",
	filename: "src/lib/ai/fetch-page.ts"
}, (opts) => fetchPageText.__executeServer(opts));
var fetchPageText = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(fetchPageText_createServerFn_handler, async ({ data }) => {
	try {
		const url = new URL(data.url);
		if (url.protocol !== "http:" && url.protocol !== "https:") return {
			ok: false,
			error: "Only http(s) URLs can be fetched."
		};
		const res = await fetch(url.toString(), {
			headers: { "User-Agent": "Loreweave/1.0 (user-initiated page read)" },
			redirect: "follow"
		});
		if (!res.ok) return {
			ok: false,
			error: `Page returned ${res.status}.`
		};
		const html = (await res.text()).slice(0, 4e5);
		const title = (html.match(/<title[^>]*>([^<]+)<\/title>/i) ?? [])[1]?.trim() ?? url.hostname;
		const text = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&/g, "&").replace(/\s+/g, " ").trim().slice(0, 4e4);
		return {
			ok: true,
			title,
			url: url.toString(),
			text
		};
	} catch {
		return {
			ok: false,
			error: "Could not fetch that page."
		};
	}
});
//#endregion
export { fetchPageText_createServerFn_handler };
