import { FINAL_REMINDER, SYSTEM_PROMPT, isSignedReply, signReply } from "@/lib/twin";

export const runtime = "nodejs";
// Keep the upstream timeout below this so visitors get a friendly message
// instead of the platform’s own timeout page.
export const maxDuration = 30;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";
const UPSTREAM_TIMEOUT_MS = 25_000;

const MAX_BODY_BYTES = 64 * 1024;
const MAX_TURNS = 12;
const MAX_MESSAGE_CHARS = 2_000;
const MAX_TOTAL_CHARS = 12_000;

// Best-effort limits. They live in this server instance’s memory, so on serverless
// hosting each instance counts separately. The OpenRouter key’s own credit limit
// is the hard backstop.
const PER_VISITOR_LIMIT = 10;
const PER_VISITOR_WINDOW_MS = 5 * 60_000;
const DAILY_LIMIT = 300;
const visitorHits = new Map();
let dailyCount = 0;
let dailyWindowStart = Date.now();

function errorResponse(message, status) {
  return Response.json({ error: message }, { status });
}

function isRateLimited(visitor) {
  const now = Date.now();

  if (now - dailyWindowStart > 24 * 60 * 60_000) {
    dailyWindowStart = now;
    dailyCount = 0;
  }
  if (dailyCount >= DAILY_LIMIT) return true;

  const recent = (visitorHits.get(visitor) || []).filter((t) => now - t < PER_VISITOR_WINDOW_MS);
  if (recent.length >= PER_VISITOR_LIMIT) {
    visitorHits.set(visitor, recent);
    return true;
  }

  recent.push(now);
  visitorHits.set(visitor, recent);
  dailyCount += 1;

  if (visitorHits.size > 5_000) {
    for (const [key, hits] of visitorHits) {
      if (hits.every((t) => now - t >= PER_VISITOR_WINDOW_MS)) visitorHits.delete(key);
    }
  }
  return false;
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Returns the conversation as {role, content} pairs, or null if it’s malformed.
// It must start with the visitor, alternate turns, end with the visitor, and every
// assistant turn must carry a valid signature from this server.
function parseConversation(raw) {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 50) return null;

  let messages = raw.slice(-MAX_TURNS);
  if (messages[0]?.role === "assistant") messages = messages.slice(1);
  if (messages.length === 0) return null;

  let total = 0;
  for (let i = 0; i < messages.length; i += 1) {
    const message = messages[i];
    const expectedRole = i % 2 === 0 ? "user" : "assistant";
    if (
      !message ||
      message.role !== expectedRole ||
      typeof message.content !== "string" ||
      !message.content.trim() ||
      message.content.length > MAX_MESSAGE_CHARS
    ) {
      return null;
    }
    if (expectedRole === "assistant" && !isSignedReply(messages[i - 1].content, message.content, message.signature)) {
      return null;
    }
    total += message.content.length;
  }

  if (total > MAX_TOTAL_CHARS || messages.at(-1).role !== "user") return null;
  return messages.map(({ role, content }) => ({ role, content }));
}

export async function POST(request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return errorResponse("The Digital Twin isn’t set up yet.", 503);
  }

  if (!isSameOrigin(request)) {
    return errorResponse("Requests must come from this website.", 403);
  }

  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) {
    return errorResponse("That message is too long.", 413);
  }

  const visitor = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (isRateLimited(visitor)) {
    return errorResponse("You’ve sent a lot of questions in a short time. Please wait a few minutes and try again.", 429);
  }

  let body;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return errorResponse("That message is too long.", 413);
    body = JSON.parse(text);
  } catch {
    return errorResponse("The request couldn’t be read.", 400);
  }

  const messages = parseConversation(body?.messages);
  if (!messages) {
    return errorResponse("This conversation can’t be continued. Start a new one and try again.", 400);
  }

  try {
    const upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Title": "Doris Agusiobo Echianu - Digital Twin",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
          { role: "system", content: FINAL_REMINDER },
        ],
        temperature: 0.35,
        max_tokens: 600,
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    const data = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      console.error("OpenRouter request failed", upstream.status, data?.error?.message);
      return upstream.status === 429
        ? errorResponse("The Digital Twin is busy right now. Please try again shortly.", 429)
        : errorResponse("The Digital Twin couldn’t answer that. Please try again.", 502);
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return errorResponse("The Digital Twin returned an empty answer. Please try again.", 502);
    }

    const question = messages.at(-1).content;
    return Response.json({ reply, signature: signReply(question, reply) });
  } catch (error) {
    console.error("Digital Twin request failed", error);
    return errorResponse(
      error?.name === "TimeoutError"
        ? "The Digital Twin took too long to answer. Please try again."
        : "The Digital Twin is unavailable right now. Please try again.",
      502
    );
  }
}
