"use client";

// A browser-only copy of LedgerGuard's review screens (ledgerguard/web), showing the
// recorded output of its one-time held-out test on synthetic invoices. Markup and
// wording follow the real app; decisions stay in this page and are never sent anywhere.

import { useRef, useState } from "react";

import data from "@/lib/ledgerguard-demo.json";
import "./ledgerguard-demo.css";

const { run, findings, invoices } = data;

const findingTypes = {
  duplicate: { name: "Duplicate", meaning: "Another invoice has the same vendor, date, purchase order and line items, so one purchase may be billed twice." },
  contract_overcharge: { name: "Contract overcharge", meaning: "A line item is priced above the rate in the vendor’s contract." },
  policy_violation: { name: "Policy violation", meaning: "The invoice breaks a clause of the spending policy. The rule section shows which one." },
  split_purchase: { name: "Split purchase", meaning: "Invoices from one vendor within a few days each stay under the approval limit but go over it together." },
  unusual_amount: { name: "Unusual amount", meaning: "The total is far above this vendor’s highest monthly spend on record. An unusual amount alone is not fraud." },
  arithmetic_error: { name: "Arithmetic error", meaning: "The invoice doesn’t add up: a line amount, the subtotal or the total doesn’t match its parts." },
  extraction_issue: { name: "Extraction issue", meaning: "The data read from the PDF may not match the document. Check it against the source text." },
};

const tabs = [
  { name: "Pending", status: "pending" },
  { name: "Approved", status: "approved" },
  { name: "Rejected", status: "rejected" },
  { name: "All", status: "all" },
];

const label = (value) => value.replaceAll("_", " ");
const formatTime = (value) =>
  `${new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(new Date(value))} UTC`;

function Badge({ status }) {
  return <span className={`lg-badge lg-${status}`}>{label(status)}</span>;
}

// In-page navigation as real links, so the app's link styles (tabs, breadcrumb) apply.
function LinkButton({ onClick, className = "", children, ...rest }) {
  return (
    <a
      href="#ledgerguard-demo"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

function statusOf(history) {
  if (history.length === 0) return "pending";
  return history[history.length - 1].decision === "approve" ? "approved" : "rejected";
}

function Runs({ statuses, open }) {
  const counts = { pending: 0, approved: 0, rejected: 0 };
  for (const status of Object.values(statuses)) counts[status] += 1;
  return (
    <>
      <header className="lg-page-heading">
        <div>
          <p className="lg-eyebrow">LedgerGuard / Review desk</p>
          <h1>Pipeline runs</h1>
          <p className="lg-muted">Every finding comes with evidence. You make the decision.</p>
        </div>
        <div className="lg-count-summary">
          <strong>{counts.pending}</strong>
          <span>
            findings awaiting
            <br /> a human decision
          </span>
        </div>
      </header>
      <section>
        <div className="lg-section-bar">
          <h2>
            All runs <span className="lg-count-tag">1</span>
          </h2>
          <span className="lg-small lg-muted">Newest first</span>
        </div>
        <div className="lg-table-scroll">
          <table className="lg-runs-table">
            <thead>
              <tr>
                <th>Run / Started</th>
                <th>Status</th>
                <th>Models</th>
                <th>Review counts</th>
                <th>
                  <span className="lg-sr-only">Open run</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <LinkButton className="lg-run-link" onClick={open} title={run.run_id}>
                    {run.run_id.slice(0, 12)}
                    <span aria-hidden="true">…</span>
                  </LinkButton>
                  <div className="lg-small lg-muted">
                    <time dateTime={run.started_at}>{formatTime(run.started_at)}</time>
                  </div>
                </td>
                <td>
                  <Badge status={run.status} />
                </td>
                <td>
                  <div className="lg-model-list">
                    {Object.entries(run.model_ids).map(([stage, model]) => (
                      <div key={stage}>
                        <span>{stage}</span>
                        <code>{model}</code>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="lg-review-counts">
                    <span><strong>{counts.pending}</strong> pending</span>
                    <span><strong>{counts.approved}</strong> approved</span>
                    <span><strong>{counts.rejected}</strong> rejected</span>
                  </div>
                </td>
                <td>
                  <LinkButton className="lg-arrow-link" onClick={open} aria-label={`Review run ${run.run_id}`}>
                    ↗
                  </LinkButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <div className="lg-desk-note">
        <span className="lg-eyebrow">Human in the loop</span>
        <p>Approvals and rejections are recorded as decisions. No payment or other action follows.</p>
      </div>
    </>
  );
}

function Queue({ statuses, tab, setTab, openFinding, home }) {
  const shown = findings.filter((f) => tab === "all" || statuses[f.finding_id] === tab);
  return (
    <>
      <nav className="lg-breadcrumb" aria-label="Breadcrumb">
        <LinkButton onClick={home}>Runs</LinkButton>
        <span>/</span>
        <span>Review queue</span>
      </nav>
      <header className="lg-page-heading">
        <div>
          <p className="lg-eyebrow">Run {run.run_id.slice(0, 12)}</p>
          <h1>Review queue</h1>
          <p className="lg-muted">Focus on the evidence. Record a decision for each finding.</p>
        </div>
        <span className="lg-count-tag">{shown.length} shown</span>
      </header>
      <p className="lg-run-id lg-small lg-muted">
        Run ID <code>{run.run_id}</code>
      </p>
      <nav className="lg-tabs" aria-label="Finding status">
        {tabs.map((t) => (
          <LinkButton key={t.name} onClick={() => setTab(t.status)} aria-current={tab === t.status ? "page" : undefined}>
            {t.name}
          </LinkButton>
        ))}
      </nav>
      {shown.length === 0 ? (
        <div className="lg-empty-state">
          <h2>No {tab === "all" ? "" : tab} findings.</h2>
          <p>{tab === "pending" ? "There is nothing waiting for a decision in this run." : "Choose another status to continue reviewing."}</p>
        </div>
      ) : (
        <div className="lg-table-scroll">
          <table className="lg-queue-table">
            <thead>
              <tr>
                <th>Finding</th>
                <th>Invoices</th>
                <th>Amount at issue</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>
                  <span className="lg-sr-only">Review</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {shown.map((f) => (
                <tr key={f.finding_id}>
                  <td className="lg-finding-cell">
                    <LinkButton className={`lg-finding-link lg-type-${f.type}`} onClick={() => openFinding(f.finding_id)}>
                      {findingTypes[f.type].name}
                    </LinkButton>
                    <p className="lg-type-meaning">{findingTypes[f.type].meaning}</p>
                    <div className="lg-small lg-muted">Finding {f.finding_id}</div>
                  </td>
                  <td className="lg-invoice-numbers">{f.invoice_numbers.join(", ")}</td>
                  <td className="lg-numeric lg-amount">{f.amount_at_issue}</td>
                  <td className="lg-numeric">{(f.confidence * 100).toFixed(0)}%</td>
                  <td>
                    <Badge status={statuses[f.finding_id]} />
                  </td>
                  <td>
                    <LinkButton className="lg-arrow-link" onClick={() => openFinding(f.finding_id)} aria-label={`Review finding ${f.finding_id}`}>
                      ↗
                    </LinkButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function DecisionForm({ onDecide }) {
  const [note, setNote] = useState("");
  const [decision, setDecision] = useState("approve");
  const [message, setMessage] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!note.trim() || note.trim().length > 1000) {
      setMessage("Enter a note of 1–1000 characters.");
      return;
    }
    setMessage("");
    onDecide(decision, note.trim());
    setNote("");
  };
  return (
    <form className="lg-decision-form" onSubmit={submit} noValidate>
      <fieldset>
        <legend>Choose a decision</legend>
        <div className="lg-decision-options">
          <label>
            <input type="radio" name="decision" value="approve" checked={decision === "approve"} onChange={() => setDecision("approve")} /> Approve finding
          </label>
          <label>
            <input type="radio" name="decision" value="reject" checked={decision === "reject"} onChange={() => setDecision("reject")} /> Reject finding
          </label>
        </div>
        <label className="lg-field-label" htmlFor="lg-decision-note">
          Decision note <span>Required</span>
        </label>
        <textarea
          id="lg-decision-note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={1000}
          rows={5}
          aria-describedby="lg-note-help lg-decision-message"
          placeholder="Explain the evidence behind your decision…"
        />
        <div className="lg-field-help" id="lg-note-help">
          <span>1–1000 characters. Your decision will be added to the history.</span>
          <span>{note.length}/1000</span>
        </div>
        <p id="lg-decision-message" role={message ? "alert" : undefined} className="lg-form-message">
          {message}
        </p>
        <button className="lg-primary-button" type="submit">
          Record decision <span aria-hidden="true">↗</span>
        </button>
      </fieldset>
      <p className="lg-small lg-muted">In this demo, decisions stay in your browser and disappear when you leave the page.</p>
    </form>
  );
}

function Finding({ finding, status, history, onDecide, home, queue }) {
  const evidence = new Set(finding.evidence.map((source) => source.text));
  const related = finding.invoice_numbers.map((number) => invoices[number]).filter(Boolean);
  return (
    <>
      <nav className="lg-breadcrumb" aria-label="Breadcrumb">
        <LinkButton onClick={home}>Runs</LinkButton>
        <span>/</span>
        <LinkButton onClick={queue}>Review queue</LinkButton>
        <span>/</span>
        <span>Finding {finding.finding_id}</span>
      </nav>
      <header className="lg-page-heading">
        <div>
          <p className="lg-eyebrow">Finding {finding.finding_id} · Evidence review</p>
          <h1>{findingTypes[finding.type].name}</h1>
          <p className={`lg-type-explainer lg-type-${finding.type}`}>{findingTypes[finding.type].meaning}</p>
          <p className="lg-muted">{finding.invoice_numbers.join(" · ")}</p>
        </div>
        <Badge status={status} />
      </header>
      <div className="lg-finding-layout">
        <div>
          <section className="lg-finding-summary" aria-labelledby="lg-what-found">
            <p className="lg-eyebrow" id="lg-what-found">01 / What was found</p>
            <div className="lg-amount-row">
              <div>
                <span className="lg-small lg-muted">Amount at issue</span>
                <p className="lg-large-amount">{finding.amount_at_issue}</p>
              </div>
              <div>
                <span className="lg-small lg-muted">Confidence</span>
                <p className="lg-confidence">{(finding.confidence * 100).toFixed(0)}%</p>
              </div>
            </div>
            <p className="lg-quote lg-calculation">{finding.calculation}</p>
          </section>

          <section className="lg-review-section">
            <h2><span>02</span> The rule</h2>
            {finding.citation ? (
              <>
                <div className="lg-clause-meta">
                  <strong>{finding.citation.clause_id}</strong>
                  <span>{finding.citation.document}</span>
                  <span>Version {finding.citation.version}</span>
                </div>
                <blockquote className="lg-quote">{finding.citation.quote}</blockquote>
              </>
            ) : (
              <p>No applicable clause identified</p>
            )}
          </section>

          <section className="lg-review-section">
            <h2><span>03</span> Source evidence</h2>
            <p className="lg-small lg-muted">Page numbers and exact source text are shown below. PDF page images are not stored.</p>
            {finding.evidence.map((source, index) => (
              <div className="lg-source" key={index}>
                <span className="lg-page-label">Page {source.page}</span>
                <blockquote className="lg-quote">{source.text}</blockquote>
              </div>
            ))}
          </section>

          <section className="lg-review-section">
            <h2><span>04</span> Invoices</h2>
            {related.map((invoice) => (
              <article className="lg-invoice" key={invoice.document_id}>
                <header>
                  <h3>{invoice.invoice_number}</h3>
                  <span>{invoice.currency}</span>
                </header>
                <p>{invoice.vendor_name}</p>
                <dl className="lg-invoice-meta">
                  <div><dt>Invoice date</dt><dd>{invoice.invoice_date}</dd></div>
                  <div><dt>Due date</dt><dd>{invoice.due_date}</dd></div>
                  <div><dt>Purchase order</dt><dd>{invoice.po_number ?? "Not provided"}</dd></div>
                </dl>
                <div className="lg-table-scroll">
                  <table>
                    <caption className="lg-sr-only">Line items for {invoice.invoice_number}</caption>
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit price</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.line_items.map((item) => (
                        <tr key={item.position} className={evidence.has(item.source.text) ? "lg-evidence-match" : ""}>
                          <td>
                            <span>{item.description}</span>
                            {evidence.has(item.source.text) && <span className="lg-match-label">Matches evidence · Page {item.source.page}</span>}
                          </td>
                          <td className="lg-numeric">{item.quantity}</td>
                          <td className="lg-numeric">{item.unit_price}</td>
                          <td className="lg-numeric">{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <dl className="lg-invoice-totals">
                  <div><dt>Subtotal</dt><dd>{invoice.subtotal}</dd></div>
                  <div><dt>Tax</dt><dd>{invoice.tax}</dd></div>
                  <div><dt>Total</dt><dd>{invoice.total}</dd></div>
                </dl>
              </article>
            ))}
          </section>

          <section className="lg-review-section">
            <h2><span>05</span> Investigator notes</h2>
            {finding.notes.length === 0 ? (
              <p className="lg-muted">No investigator note is available.</p>
            ) : (
              finding.notes.map((note) => (
                <article className="lg-ai-note" key={note.finding_index}>
                  <header>
                    <span className="lg-eyebrow">AI-generated note</span>
                    <span className="lg-small">Uncertainty: {note.uncertainty}</span>
                  </header>
                  <p className="lg-quote">{note.summary}</p>
                  <p className="lg-small lg-muted">Related invoices: {note.related_invoices.join(", ") || "None"}</p>
                </article>
              ))
            )}
          </section>

          <section className="lg-review-section">
            <h2><span>06</span> Decision history</h2>
            {history.length === 0 ? (
              <p className="lg-muted">No decisions yet. This finding is waiting for review.</p>
            ) : (
              <ol className="lg-history">
                {history.map((d) => (
                  <li key={d.decision_id}>
                    <div className="lg-history-heading">
                      <strong>{d.decision === "approve" ? "Approved" : "Rejected"}</strong>
                      <span className="lg-small lg-muted">
                        <time dateTime={d.time}>{formatTime(d.time)}</time>
                      </span>
                    </div>
                    <p className="lg-quote">{d.note}</p>
                    <p className="lg-small lg-muted">{d.reviewer} · Decision {d.decision_id}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section className="lg-review-section lg-decision-section">
            <h2><span>07</span> Your decision</h2>
            <p className="lg-muted">Does the evidence support this finding?</p>
            <DecisionForm onDecide={onDecide} />
          </section>
        </div>
        <aside className="lg-review-guide">
          <p className="lg-eyebrow">Review checklist</p>
          <h2>
            A decision backed
            <br />
            by evidence.
          </h2>
          <ol>
            <li>Check the calculation.</li>
            <li>Read the applicable rule.</li>
            <li>Compare source evidence.</li>
            <li>Record your reasoning.</li>
          </ol>
          <div className="lg-guide-note">
            <span aria-hidden="true">↳</span>
            <p>AI notes provide context. Use the source evidence to make your decision.</p>
          </div>
        </aside>
      </div>
    </>
  );
}

export default function ReviewDemo() {
  const [view, setView] = useState({ page: "runs" });
  const [tab, setTab] = useState("pending");
  const [history, setHistory] = useState(() => Object.fromEntries(findings.map((f) => [f.finding_id, []])));
  const top = useRef(null);

  const statuses = Object.fromEntries(findings.map((f) => [f.finding_id, statusOf(history[f.finding_id])]));
  const go = (next) => {
    setView(next);
    top.current?.scrollIntoView({ block: "start" });
  };
  const decide = (findingId) => (decision, note) => {
    const time = new Date().toISOString();
    setHistory((current) => {
      // Decision IDs count up across the whole run, like the real database sequence.
      const decisionId = Object.values(current).reduce((sum, list) => sum + list.length, 0) + 1;
      const entry = { decision_id: decisionId, decision, note, reviewer: "You (demo)", time };
      return { ...current, [findingId]: [...current[findingId], entry] };
    });
  };

  const finding = view.page === "finding" ? findings.find((f) => f.finding_id === view.findingId) : null;

  return (
    <div className="lg-demo" id="ledgerguard-demo" ref={top}>
      <header className="lg-app-header">
        <LinkButton className="lg-brand" onClick={() => go({ page: "runs" })}>
          <span className="lg-brand-mark" aria-hidden="true">
            L<span>G</span>
          </span>
          LedgerGuard
        </LinkButton>
        <div className="lg-header-divider" />
        <span className="lg-workspace-label">Review workspace</span>
        <span className="lg-local-label">
          <span aria-hidden="true">●</span> Portfolio demo <i>/</i> Synthetic data
        </span>
      </header>
      <div className="lg-main">
        {view.page === "runs" && <Runs statuses={statuses} open={() => go({ page: "queue" })} />}
        {view.page === "queue" && (
          <Queue statuses={statuses} tab={tab} setTab={setTab} openFinding={(id) => go({ page: "finding", findingId: id })} home={() => go({ page: "runs" })} />
        )}
        {finding && (
          <Finding
            key={finding.finding_id}
            finding={finding}
            status={statuses[finding.finding_id]}
            history={history[finding.finding_id]}
            onDecide={decide(finding.finding_id)}
            home={() => go({ page: "runs" })}
            queue={() => go({ page: "queue" })}
          />
        )}
      </div>
      <footer className="lg-app-footer">
        <span>LedgerGuard / Human review, supported by evidence.</span>
        <span>Synthetic invoices only · Version 1</span>
      </footer>
    </div>
  );
}
