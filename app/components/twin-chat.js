"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import portrait from "@/public/doris-agusiobo-echianu.png";

const SUGGESTIONS = [
  "What does Doris work on?",
  "Tell me about Prelegal.",
  "How does her design background shape her AI work?",
  "What is she studying?",
];

// A Digital Twin message: Doris's photo beside the bubble.
function TwinBubble({ className = "", children }) {
  return (
    <div className="twin-row">
      <Image src={portrait} alt="" className="twin-avatar" width={36} height={36} sizes="36px" />
      <div className={`bubble bubble-twin ${className}`}>
        <span className="bubble-who">Digital Twin · AI</span>
        {children}
      </div>
    </div>
  );
}

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
        <TwinBubble>
          <p>
            Hi, I’m Doris’s Digital Twin, an AI that answers from verified facts about her work. Ask me about her projects,
            experience or how she approaches AI.
          </p>
        </TwinBubble>

        {messages.map((message, i) => {
          const paragraphs = message.content.split(/\n{2,}/).map((para, j) => <p key={j}>{para}</p>);
          return message.role === "user" ? (
            <div key={i} className="bubble bubble-you">
              <span className="bubble-who">You</span>
              {paragraphs}
            </div>
          ) : (
            <TwinBubble key={i}>{paragraphs}</TwinBubble>
          );
        })}

        {pending && (
          <TwinBubble className="bubble-pending">
            <p>
              <span className="typing" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="visually-hidden">Thinking…</span>
            </p>
          </TwinBubble>
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
