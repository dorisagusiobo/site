"use client";

import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "What does Doris work on?",
  "Tell me about Prelegal.",
  "How does her design background shape her AI work?",
  "What is she studying?",
];

export default function TwinChat() {
  // Each entry: { role: "user" | "assistant", content, signature? }
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const logRef = useRef(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function ask(question, history = messages) {
    const text = question.trim();
    if (!text || pending) return;

    const next = [...history, { role: "user", content: text }];
    setMessages(next);
    setDraft("");
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The Digital Twin couldn’t answer that. Please try again.");
      setMessages([...next, { role: "assistant", content: data.reply, signature: data.signature }]);
    } catch (err) {
      setError({ message: err.message, question: text, history });
    } finally {
      setPending(false);
    }
  }

  function retry() {
    if (!error) return;
    ask(error.question, error.history);
  }

  function startOver() {
    setMessages([]);
    setError(null);
    setDraft("");
  }

  return (
    <div className="chat">
      <div className="chat-log" ref={logRef} aria-live="polite" aria-busy={pending}>
        <div className="bubble bubble-twin">
          <span className="bubble-who">Digital Twin · AI</span>
          <p>
            Hi, I’m Doris’s Digital Twin, an AI that answers from verified facts about her work. Ask me about her projects,
            experience or how she approaches AI.
          </p>
        </div>

        {messages.map((message, i) => (
          <div key={i} className={`bubble ${message.role === "user" ? "bubble-you" : "bubble-twin"}`}>
            <span className="bubble-who">{message.role === "user" ? "You" : "Digital Twin · AI"}</span>
            {message.content.split(/\n{2,}/).map((para, j) => (
              <p key={j}>{para}</p>
            ))}
          </div>
        ))}

        {pending && (
          <div className="bubble bubble-twin bubble-pending">
            <span className="bubble-who">Digital Twin · AI</span>
            <p>
              <span className="typing" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="visually-hidden">Thinking…</span>
            </p>
          </div>
        )}

        {error && (
          <div className="chat-error" role="alert">
            <p>{error.message}</p>
            <div className="chat-error-actions">
              <button type="button" onClick={retry}>
                Try again
              </button>
              <button type="button" onClick={startOver}>
                Start over
              </button>
            </div>
          </div>
        )}
      </div>

      {messages.length === 0 && (
        <div className="chips" aria-label="Suggested questions">
          {SUGGESTIONS.map((suggestion) => (
            <button key={suggestion} type="button" className="chip" onClick={() => ask(suggestion)} disabled={pending}>
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form
        className="chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          ask(draft);
        }}
      >
        <label htmlFor="twin-question" className="visually-hidden">
          Your question for the Digital Twin
        </label>
        <textarea
          id="twin-question"
          rows={2}
          maxLength={2000}
          placeholder="Ask about Doris’s work…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              ask(draft);
            }
          }}
        />
        <button type="submit" className="button button-primary" disabled={pending || !draft.trim()}>
          {pending ? "Thinking…" : "Ask"}
        </button>
      </form>
      <p className="chat-note">
        AI-generated answers can be wrong. For anything important, reach Doris on LinkedIn.
        {messages.length > 0 && (
          <>
            {" "}
            <button type="button" className="link-button" onClick={startOver}>
              Start a new conversation
            </button>
          </>
        )}
      </p>
    </div>
  );
}
