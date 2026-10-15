# Doris Agusiobo Echianu: portfolio

My portfolio site, with a built-in **Digital Twin**: an AI that answers visitors' questions about my work using only verified facts.

**Design idea:** complexity, made clear. The logo is a set of scattered points that settle into one straight line.

## What's in it

- **One page:** results, selected work, about, experience, education and credentials, the Digital Twin, and contact links.
- **One source of facts.** [`lib/profile.js`](lib/profile.js) holds every career fact. The page and the Digital Twin's instructions are both built from it, so they can't disagree. Edit that file to update the site.
- **Fast and accessible.** The page is static HTML. Only the chat runs JavaScript in the browser. It supports light and dark mode and keyboard navigation, and all text meets contrast guidelines.
- **Ready to share.** Generated link-preview image, site icon, sitemap, robots.txt and search-engine profile data.

## Digital Twin safeguards

The chat endpoint ([`app/api/chat/route.js`](app/api/chat/route.js)) calls a paid AI API, so it's protected:

- **Signed replies.** Each AI answer is signed by the server. A visitor can't send back a made-up "assistant" message to put words in the twin's mouth.
- **Same-site only.** Requests from other websites are refused.
- **Limits.** 10 questions per visitor every 5 minutes, a daily ceiling, and caps on message and request size. These limits are per server instance, so set a **credit limit on the OpenRouter key** as the hard backstop.
- **Grounded answers.** The twin answers only from `lib/profile.js`, says when it doesn't know, and points people to LinkedIn.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then add your OpenRouter key
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Name | Required | Purpose |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | Key for the Digital Twin's AI model |
| `TWIN_SIGNING_SECRET` | In production | Long random string for signing replies. Without it, conversations can break across server restarts. |
| `SITE_URL` | Optional | Public URL for link previews and the sitemap. Detected automatically on Vercel. |

## Stack

Next.js 16 (App Router), React 19, plain CSS, OpenRouter (`gpt-oss-120b`).
