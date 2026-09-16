import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { i as classifyProviderError, o as sanitizeLog } from "./key-security-CC_smRtt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complete-DCB99lAp.js
var demoHits = /* @__PURE__ */ new Map();
function dayKey() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function demoAllowed(ip) {
	const day = dayKey();
	const cur = demoHits.get(ip);
	if (!cur || cur.day !== day) {
		demoHits.set(ip, {
			day,
			count: 1
		});
		return true;
	}
	if (cur.count >= 16) return false;
	cur.count += 1;
	return true;
}
function fail(status, raw) {
	const classified = classifyProviderError(status, raw);
	return {
		ok: false,
		code: classified.code,
		error: classified.message
	};
}
var completeChat_createServerFn_handler = createServerRpc({
	id: "f4765370ab8d02f04211ab1a592f12c89e855bcfb9666a38a0d4126d9a8021e4",
	name: "completeChat",
	filename: "src/lib/ai/complete.ts"
}, (opts) => completeChat.__executeServer(opts));
var completeChat = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(completeChat_createServerFn_handler, async ({ data }) => {
	try {
		if (data.demo || !data.apiKey) {
			const key = process.env.XAI_API_KEY;
			if (!key) return {
				ok: false,
				code: "no_provider",
				error: "Add your own API key in Providers. Demo AI is not configured here."
			};
			if (!demoAllowed("preview")) return {
				ok: false,
				code: "rate_limit",
				error: "Demo daily limit reached. Add your own key for unlimited BYOK use."
			};
			return {
				...await openaiCompat({
					baseUrl: "https://api.x.ai/v1",
					apiKey: key,
					model: "grok-4.5",
					messages: data.messages,
					temperature: data.temperature ?? .7,
					maxTokens: Math.min(data.maxTokens ?? 900, 900)
				}),
				demo: true
			};
		}
		if (data.format === "anthropic") return await anthropicCompat(data);
		if (data.format === "gemini") return await geminiCompat(data);
		if (data.format === "ollama") return await ollamaCompat(data);
		return await openaiCompat({
			baseUrl: data.baseUrl.replace(/\/$/, ""),
			apiKey: data.apiKey,
			model: data.model,
			messages: data.messages,
			temperature: data.temperature ?? .7,
			maxTokens: data.maxTokens ?? 2048,
			headers: data.headers
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : "Network failure talking to the provider.";
		return {
			ok: false,
			code: "network",
			error: sanitizeLog(message)
		};
	}
});
async function openaiCompat(opts) {
	const res = await fetch(`${opts.baseUrl}/chat/completions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${opts.apiKey}`,
			...opts.headers
		},
		body: JSON.stringify({
			model: opts.model,
			messages: opts.messages,
			temperature: opts.temperature,
			max_tokens: opts.maxTokens
		})
	});
	const raw = await res.text();
	if (!res.ok) return fail(res.status, raw);
	let body;
	try {
		body = JSON.parse(raw);
	} catch {
		return {
			ok: false,
			code: "invalid_response",
			error: "Provider returned non-JSON."
		};
	}
	const text = body.choices?.[0]?.message?.content ?? "";
	if (!text) return {
		ok: false,
		code: "invalid_response",
		error: "Empty model response."
	};
	return {
		ok: true,
		text,
		model: opts.model
	};
}
async function anthropicCompat(data) {
	const system = data.messages.filter((m) => m.role === "system").map((m) => m.content).join("\n");
	const messages = data.messages.filter((m) => m.role !== "system").map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		content: m.content
	}));
	const res = await fetch(`${data.baseUrl.replace(/\/$/, "")}/messages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": data.apiKey ?? "",
			"anthropic-version": "2023-06-01",
			...data.headers
		},
		body: JSON.stringify({
			model: data.model,
			max_tokens: data.maxTokens ?? 2048,
			temperature: data.temperature ?? .7,
			system: system || void 0,
			messages
		})
	});
	const raw = await res.text();
	if (!res.ok) return fail(res.status, raw);
	try {
		const text = (JSON.parse(raw).content ?? []).map((c) => c.text ?? "").join("");
		if (!text) return {
			ok: false,
			code: "invalid_response",
			error: "Empty model response."
		};
		return {
			ok: true,
			text,
			model: data.model
		};
	} catch {
		return {
			ok: false,
			code: "invalid_response",
			error: "Provider returned non-JSON."
		};
	}
}
async function geminiCompat(data) {
	const url = `${data.baseUrl.replace(/\/$/, "")}/models/${encodeURIComponent(data.model)}:generateContent?key=${encodeURIComponent(data.apiKey ?? "")}`;
	const contents = data.messages.filter((m) => m.role !== "system").map((m) => ({
		role: m.role === "assistant" ? "model" : "user",
		parts: [{ text: m.content }]
	}));
	const system = data.messages.filter((m) => m.role === "system").map((m) => m.content).join("\n");
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...data.headers
		},
		body: JSON.stringify({
			contents,
			systemInstruction: system ? { parts: [{ text: system }] } : void 0,
			generationConfig: {
				temperature: data.temperature ?? .7,
				maxOutputTokens: data.maxTokens ?? 2048
			}
		})
	});
	const raw = await res.text();
	if (!res.ok) return fail(res.status, raw);
	try {
		const text = JSON.parse(raw).candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
		if (!text) return {
			ok: false,
			code: "invalid_response",
			error: "Empty model response."
		};
		return {
			ok: true,
			text,
			model: data.model
		};
	} catch {
		return {
			ok: false,
			code: "invalid_response",
			error: "Provider returned non-JSON."
		};
	}
}
async function ollamaCompat(data) {
	const res = await fetch(`${data.baseUrl.replace(/\/$/, "")}/api/chat`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...data.headers
		},
		body: JSON.stringify({
			model: data.model,
			messages: data.messages,
			stream: false,
			options: { temperature: data.temperature ?? .7 }
		})
	});
	const raw = await res.text();
	if (!res.ok) return fail(res.status, raw);
	try {
		const text = JSON.parse(raw).message?.content ?? "";
		if (!text) return {
			ok: false,
			code: "invalid_response",
			error: "Empty model response."
		};
		return {
			ok: true,
			text,
			model: data.model
		};
	} catch {
		return {
			ok: false,
			code: "invalid_response",
			error: "Provider returned non-JSON."
		};
	}
}
//#endregion
export { completeChat_createServerFn_handler };
