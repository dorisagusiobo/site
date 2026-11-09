"use client";

// A browser-only copy of CareBridge's screens (carebridge/frontend), showing a plan the
// live app made from its fictional pneumonia sample. Markup, wording and check-in logic
// follow the real app; nothing is sent anywhere and nothing is stored.

import { useEffect, useRef, useState } from "react";

import data from "@/lib/carebridge-demo.json";
import "./carebridge-demo.css";

const { sample, result, generated } = data;
const plan = result.plan;

const ui = {
  tagDemo: "Demo · fictional patients only",
  introTitle: "Understand your hospital instructions",
  introLede:
    "Paste the instructions you got when you left the hospital. CareBridge turns them into a clear plan: what to take, what to avoid, and when to get help.",
  pasteLabel: "Paste your discharge instructions",
  pasteHint:
    "Copy the text from your hospital paperwork or patient portal. Leave out your name, date of birth and record numbers.",
  trySample: "Or try a fictional patient:",
  makePlan: "Make my care plan",
  introDisclaimer:
    "CareBridge explains instructions in plain words. It doesn't diagnose or give medical advice, and it doesn't replace your care team. In an emergency, call 911.",
  tabPlan: "Your plan",
  tabCheckin: "Daily check-in",
  tabProgress: "Progress",
  readAloud: "Read aloud",
  stopReading: "Stop reading",
  eyebrow: "Your care plan",
  planTitle: "What to do at home",
  keyPoints: "Most important",
  showSources: "Show where each line came from",
  print: "Print",
  startOver: "Start over",
  whenToGetHelp: "When to get help",
  ifCall911: "Call 911 right away if you have",
  ifEr: "Go to the emergency room if you have",
  ifCall: "Call your doctor or care team if you have",
  ifAsk: "Ask your care team what to do if you have",
  movedUp: "Moved up by CareBridge: {flag} can be a sign of an emergency. Your instructions said: {instructed}.",
  saidCall911: "call 911",
  saidEr: "go to the emergency room",
  saidCall: "call your care team",
  saidNothing: "nothing specific",
  medicines: "Your medicines",
  changeNew: "New",
  changeChanged: "Changed",
  changeContinue: "Keep taking",
  changeStop: "Stop taking",
  stopped: "Don't take this any more.",
  appointments: "Appointments",
  selfCare: "Taking care of yourself",
  avoid: "Things to avoid",
  questions: "Questions to ask your care team",
  questionsHint: "Your instructions didn't answer these. Bring them to your next call or visit.",
  copyQuestions: "Copy questions",
  copied: "Copied",
  planDisclaimer:
    "CareBridge explains your instructions in plain words. It doesn't give medical advice. If anything here doesn't match what your care team told you, follow your care team. In an emergency, call 911.",
  checkinTitle: "How are you today?",
  anyToday: "Do you have any of these today?",
  tickHint: "Tick anything you have right now.",
  medsToday: "Your medicines today",
  taken: "Taken",
  missed: "Missed",
  noteLabel: "Anything else to note?",
  optional: "(optional)",
  notePlaceholder: "For example: weight this morning, how you slept",
  saveCheckin: "Save today's check-in",
  now911: "Call 911 now.",
  nowEr: "Go to the emergency room now.",
  nowCall: "Call your doctor or care team today.",
  nowAsk: "Call your care team and ask what to do.",
  youHave: "You said you have: {signs}.",
  missedNotice:
    "You missed {meds}. Don't take extra to catch up unless your care team says to. Ask your care team or pharmacist what to do.",
  savedOk: "Saved. Nothing you reported needs a call right now. Check in again tomorrow.",
  changeAnswers: "Change today's answers",
  progressTitle: "Your progress",
  noCheckins: "No check-ins yet. Your daily check-ins will show up here.",
  logMedicines: "Medicines",
  logTaken: "{taken} of {total} taken",
  logWarnings: "Warning signs",
  logNone: "None",
  logSelfCare: "Self-care",
  logDone: "{done} of {total} done",
  logNote: "Note",
};

const fill = (template, values) =>
  template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));

// Most urgent first, as in labels.ts.
const ACTION_ORDER = ["call_911", "go_to_er", "call_care_team", "not_stated"];
const ACTION_RANK = { not_stated: 0, call_care_team: 1, go_to_er: 2, call_911: 3 };
const ACTION_TONE = { call_911: "urgent", go_to_er: "er", call_care_team: "call", not_stated: "ask" };
const actionTitle = (action) =>
  ({ call_911: ui.ifCall911, go_to_er: ui.ifEr, call_care_team: ui.ifCall, not_stated: ui.ifAsk })[action];
const doNow = (action) =>
  ({ call_911: ui.now911, go_to_er: ui.nowEr, call_care_team: ui.nowCall, not_stated: ui.nowAsk })[action];
const instructedLabel = (action) =>
  ({ call_911: ui.saidCall911, go_to_er: ui.saidEr, call_care_team: ui.saidCall, not_stated: ui.saidNothing })[action];
const changeLabel = (change) =>
  ({
    new: ui.changeNew,
    changed: ui.changeChanged,
    continue: ui.changeContinue,
    stop: ui.changeStop,
    not_stated: null,
  })[change];

const today = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};
const medsToCheck = () => plan.medications.filter((med) => med.change !== "stop");
const formatDate = (date) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" });
};

function urgentFindings(checkIn) {
  const reported = plan.warning_signs.filter((_, index) => checkIn.symptoms.includes(index));
  const actions = [...new Set(reported.map((sign) => sign.action))].sort((a, b) => ACTION_RANK[b] - ACTION_RANK[a]);
  return actions.map((action) => ({ action, signs: reported.filter((sign) => sign.action === action) }));
}

function planToSpeech() {
  const lines = [ui.planTitle, plan.reason_for_stay, ...plan.key_points.map((point) => point.text)];
  if (plan.warning_signs.length) {
    lines.push(ui.whenToGetHelp);
    for (const action of ACTION_ORDER) {
      const signs = plan.warning_signs.filter((sign) => sign.action === action);
      if (signs.length) lines.push(`${actionTitle(action)}: ${signs.map((sign) => sign.sign).join(", ")}.`);
    }
  }
  if (plan.medications.length) {
    lines.push(ui.medicines);
    for (const med of plan.medications) {
      lines.push(
        `${med.name}. ${med.change === "stop" ? ui.stopped : [med.dose, med.when].filter(Boolean).join(", ")}`,
      );
    }
  }
  const lists = [
    [ui.appointments, plan.appointments.map((appt) => `${appt.with_whom}: ${appt.when}`)],
    [ui.selfCare, plan.self_care.map((item) => item.text)],
    [ui.avoid, plan.avoid.map((item) => item.text)],
    [ui.questions, plan.questions_for_care_team],
  ];
  for (const [title, items] of lists) if (items.length) lines.push(title, ...items);
  return lines.filter((line) => line.trim());
}

function Source({ text, show }) {
  if (!show || !text) return null;
  return (
    <q className="cb-source" lang="en" dir="ltr" aria-label="From your instructions">
      {text}
    </q>
  );
}

function Section({ title, children, empty }) {
  if (empty) return null;
  return (
    <section className="cb-plan-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ReadAloud() {
  const [supported, setSupported] = useState(false);
  const [voice, setVoice] = useState(undefined);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
    const synth = window.speechSynthesis;
    const pick = () => {
      setSupported(true);
      setVoice(synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("en")));
    };
    pick();
    synth.addEventListener("voiceschanged", pick);
    return () => {
      synth.removeEventListener("voiceschanged", pick);
      synth.cancel();
    };
  }, []);

  if (!supported) return null;
  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };
  const start = () => {
    window.speechSynthesis.cancel();
    const lines = planToSpeech();
    lines.forEach((line, index) => {
      const utterance = new SpeechSynthesisUtterance(line);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang ?? "en";
      utterance.rate = 0.95;
      if (index === lines.length - 1) {
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);
      }
      window.speechSynthesis.speak(utterance);
    });
    setSpeaking(true);
  };
  return (
    <button type="button" className="cb-button-secondary" aria-pressed={speaking} onClick={speaking ? stop : start}>
      {speaking ? ui.stopReading : ui.readAloud}
    </button>
  );
}

function CarePlanView({ onStartOver }) {
  const [showSources, setShowSources] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyQuestions = async () => {
    try {
      await navigator.clipboard.writeText(plan.questions_for_care_team.map((q) => `- ${q}`).join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="cb-plan" aria-labelledby="cb-plan-title">
      <header className="cb-plan-header">
        <p className="cb-eyebrow">{ui.eyebrow}</p>
        <h1 id="cb-plan-title">{ui.planTitle}</h1>
        {plan.reason_for_stay && (
          <p className="cb-lede">
            {plan.reason_for_stay}
            <Source text={plan.reason_source} show={showSources} />
          </p>
        )}
        {plan.key_points.length > 0 && (
          <ul className="cb-summary" aria-label={ui.keyPoints}>
            {plan.key_points.map((point) => (
              <li key={point.text + point.source}>
                {point.text}
                <Source text={point.source} show={showSources} />
              </li>
            ))}
          </ul>
        )}
        <div className="cb-plan-tools">
          <label className="cb-toggle">
            <input type="checkbox" checked={showSources} onChange={(e) => setShowSources(e.target.checked)} />
            {ui.showSources}
          </label>
          <ReadAloud />
          <button type="button" className="cb-button-secondary" onClick={onStartOver}>
            {ui.startOver}
          </button>
        </div>
      </header>

      <Section title={ui.whenToGetHelp} empty={plan.warning_signs.length === 0}>
        <div className="cb-warnings">
          {ACTION_ORDER.map((action) => {
            const signs = plan.warning_signs.filter((sign) => sign.action === action);
            if (signs.length === 0) return null;
            return (
              <div key={action} className={`cb-warning cb-warning-${ACTION_TONE[action]}`}>
                <h3>{actionTitle(action)}:</h3>
                <ul>
                  {signs.map((sign) => (
                    <li key={sign.sign + sign.source}>
                      {sign.sign}
                      {sign.red_flag && (
                        <span className="cb-raised">
                          {fill(ui.movedUp, {
                            flag: sign.red_flag,
                            instructed: instructedLabel(sign.instructed_action),
                          })}
                        </span>
                      )}
                      <Source text={sign.source} show={showSources} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title={ui.medicines} empty={plan.medications.length === 0}>
        <ul className="cb-meds">
          {plan.medications.map((med) => {
            const label = changeLabel(med.change);
            return (
              <li key={med.name + med.source} className={`cb-med cb-med-${med.change}`}>
                <div className="cb-med-head">
                  <h3>{med.name}</h3>
                  {label && <span className={`cb-badge cb-badge-${med.change}`}>{label}</span>}
                </div>
                {med.change !== "stop" && (
                  <p className="cb-med-dose">
                    {med.dose && <strong>{med.dose}</strong>}
                    {med.dose && med.when && " · "}
                    {med.when}
                  </p>
                )}
                {med.change === "stop" && <p className="cb-med-dose">{med.when || ui.stopped}</p>}
                {med.purpose && <p className="cb-med-purpose">{med.purpose}</p>}
                <Source text={med.source} show={showSources} />
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title={ui.appointments} empty={plan.appointments.length === 0}>
        <ul className="cb-list">
          {plan.appointments.map((appt) => (
            <li key={appt.with_whom + appt.source}>
              <strong>{appt.with_whom}</strong>: {appt.when}
              {appt.purpose && <span className="cb-muted"> ({appt.purpose})</span>}
              <Source text={appt.source} show={showSources} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title={ui.selfCare} empty={plan.self_care.length === 0}>
        <ul className="cb-list">
          {plan.self_care.map((item) => (
            <li key={item.text + item.source}>
              {item.text}
              <Source text={item.source} show={showSources} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title={ui.avoid} empty={plan.avoid.length === 0}>
        <ul className="cb-list cb-list-avoid">
          {plan.avoid.map((item) => (
            <li key={item.text + item.source}>
              {item.text}
              <Source text={item.source} show={showSources} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title={ui.questions} empty={plan.questions_for_care_team.length === 0}>
        <p className="cb-hint">{ui.questionsHint}</p>
        <ol className="cb-list cb-questions">
          {plan.questions_for_care_team.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
        <button type="button" className="cb-button-secondary" onClick={copyQuestions}>
          {copied ? ui.copied : ui.copyQuestions}
        </button>
      </Section>

      <p className="cb-disclaimer">{ui.planDisclaimer}</p>
    </article>
  );
}

function toggle(list, item, on) {
  return on ? [...list, item] : list.filter((value) => value !== item);
}

function CheckInForm({ existing, onSave }) {
  const [meds, setMeds] = useState(existing?.meds ?? {});
  const [symptoms, setSymptoms] = useState(existing?.symptoms ?? []);
  const [done, setDone] = useState(existing?.done ?? []);
  const [note, setNote] = useState(existing?.note ?? "");
  const medications = medsToCheck();
  return (
    <form
      className="cb-checkin"
      onSubmit={(event) => {
        event.preventDefault();
        onSave({ date: existing?.date ?? today(), meds, symptoms, done, note: note.trim() });
      }}
    >
      <fieldset>
        <legend>{ui.anyToday}</legend>
        <p className="cb-hint">{ui.tickHint}</p>
        {plan.warning_signs.map((sign, index) => (
          <label key={sign.sign + sign.source} className="cb-check">
            <input
              type="checkbox"
              checked={symptoms.includes(index)}
              onChange={(e) => setSymptoms(toggle(symptoms, index, e.target.checked))}
            />
            {sign.sign}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>{ui.medsToday}</legend>
        {medications.map((med) => (
          <div key={med.name} className="cb-dose" role="radiogroup" aria-label={med.name}>
            <span className="cb-dose-name">
              <strong>{med.name}</strong>
              <span className="cb-muted">{[med.dose, med.when].filter(Boolean).join(" · ")}</span>
            </span>
            <span className="cb-dose-options">
              {["taken", "missed"].map((status) => (
                <label key={status} className="cb-pill">
                  <input
                    type="radio"
                    name={`cb-dose-${med.name}`}
                    checked={meds[med.name] === status}
                    onChange={() => setMeds({ ...meds, [med.name]: status })}
                  />
                  {status === "taken" ? ui.taken : ui.missed}
                </label>
              ))}
            </span>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend>{ui.selfCare}</legend>
        {plan.self_care.map((item, index) => (
          <label key={item.text + item.source} className="cb-check">
            <input
              type="checkbox"
              checked={done.includes(index)}
              onChange={(e) => setDone(toggle(done, index, e.target.checked))}
            />
            {item.text}
          </label>
        ))}
      </fieldset>
      <label className="cb-intake-label" htmlFor="cb-note">
        {ui.noteLabel} <span className="cb-hint">{ui.optional}</span>
      </label>
      <textarea
        id="cb-note"
        rows={3}
        maxLength={500}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={ui.notePlaceholder}
      />
      <button type="submit" className="cb-button">
        {ui.saveCheckin}
      </button>
    </form>
  );
}

function CheckInResult({ checkIn, onEdit }) {
  const findings = urgentFindings(checkIn);
  const missed = Object.entries(checkIn.meds)
    .filter(([, status]) => status === "missed")
    .map(([name]) => name);
  return (
    <div className="cb-checkin-result">
      {findings.map(({ action, signs }) => (
        <div key={action} className={`cb-warning cb-warning-${ACTION_TONE[action]}`} role="alert">
          <h3>{doNow(action)}</h3>
          <p>{fill(ui.youHave, { signs: signs.map((sign) => sign.sign.toLowerCase()).join(", ") })}</p>
        </div>
      ))}
      {missed.length > 0 && <p className="cb-notice">{fill(ui.missedNotice, { meds: missed.join(", ") })}</p>}
      {findings.length === 0 && (
        <p className="cb-saved" role="status">
          {ui.savedOk}
        </p>
      )}
      <button type="button" className="cb-button-secondary" onClick={onEdit}>
        {ui.changeAnswers}
      </button>
    </div>
  );
}

function ProgressLog({ checkIns }) {
  if (checkIns.length === 0) return <p className="cb-hint">{ui.noCheckins}</p>;
  const total = medsToCheck().length;
  return (
    <ol className="cb-log">
      {checkIns.map((checkIn) => {
        const taken = Object.values(checkIn.meds).filter((status) => status === "taken").length;
        const symptoms = checkIn.symptoms.map((index) => plan.warning_signs[index]?.sign).filter(Boolean);
        return (
          <li key={checkIn.date} className="cb-log-day">
            <h3>{formatDate(checkIn.date)}</h3>
            <dl>
              <div>
                <dt>{ui.logMedicines}</dt>
                <dd>{fill(ui.logTaken, { taken, total })}</dd>
              </div>
              <div>
                <dt>{ui.logWarnings}</dt>
                <dd className={symptoms.length ? "cb-log-symptoms" : undefined}>
                  {symptoms.length ? symptoms.join(", ") : ui.logNone}
                </dd>
              </div>
              <div>
                <dt>{ui.logSelfCare}</dt>
                <dd>{fill(ui.logDone, { done: checkIn.done.length, total: plan.self_care.length })}</dd>
              </div>
              {checkIn.note && (
                <div>
                  <dt>{ui.logNote}</dt>
                  <dd>{checkIn.note}</dd>
                </div>
              )}
            </dl>
          </li>
        );
      })}
    </ol>
  );
}

export default function CareDemo() {
  const [text, setText] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [view, setView] = useState("plan");
  const [checkIn, setCheckIn] = useState(null);
  const [editing, setEditing] = useState(false);
  const top = useRef(null);

  const go = (next) => {
    next();
    top.current?.scrollIntoView({ block: "start" });
  };
  const tabs = [
    { view: "plan", label: ui.tabPlan },
    { view: "checkin", label: ui.tabCheckin },
    { view: "progress", label: ui.tabProgress },
  ];

  return (
    <div ref={top} className="cb-demo" id="carebridge-demo">
      <div className="cb-page">
        <header className="cb-site-header">
          <button type="button" className="cb-brand" onClick={() => setView("plan")}>
            <svg viewBox="0 0 64 24" aria-hidden="true" className="cb-brand-mark">
              <path d="M4 18 C 16 4, 48 4, 60 18" />
            </svg>
            CareBridge
          </button>
          <span className="cb-tag">{ui.tagDemo}</span>
        </header>

        <div className="cb-main" lang="en">
          {showPlan ? (
            <>
              <p className="cb-translated-notice">
                Recorded demo: this plan was made by the live CareBridge app on{" "}
                {new Date(`${generated.date}T12:00:00`).toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                from the fictional patient’s paperwork, and is shown here instantly. Check-ins stay on this page.
              </p>
              <nav className="cb-tabs" aria-label="Care plan sections">
                {tabs.map((tab) => (
                  <button
                    key={tab.view}
                    type="button"
                    aria-current={view === tab.view ? "page" : undefined}
                    onClick={() => setView(tab.view)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              {view === "plan" && (
                <CarePlanView
                  onStartOver={() =>
                    go(() => {
                      setShowPlan(false);
                      setText("");
                      setCheckIn(null);
                      setView("plan");
                    })
                  }
                />
              )}
              {view === "checkin" && (
                <section className="cb-plan-section">
                  <h1>{ui.checkinTitle}</h1>
                  {checkIn && !editing ? (
                    <CheckInResult checkIn={checkIn} onEdit={() => setEditing(true)} />
                  ) : (
                    <CheckInForm
                      existing={checkIn ?? undefined}
                      onSave={(next) => {
                        setCheckIn(next);
                        setEditing(false);
                      }}
                    />
                  )}
                </section>
              )}
              {view === "progress" && (
                <section className="cb-plan-section">
                  <h1>{ui.progressTitle}</h1>
                  <ProgressLog checkIns={checkIn ? [checkIn] : []} />
                </section>
              )}
            </>
          ) : (
            <>
              <section className="cb-intro">
                <h1>{ui.introTitle}</h1>
                <p className="cb-lede">{ui.introLede}</p>
              </section>
              <form
                className="cb-intake"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (text) go(() => setShowPlan(true));
                }}
              >
                <label htmlFor="cb-instructions" className="cb-intake-label">
                  {ui.pasteLabel}
                </label>
                <p className="cb-hint" id="cb-instructions-hint">
                  In this demo, choose the fictional patient below. The live app accepts any pasted instructions.
                </p>
                <textarea
                  id="cb-instructions"
                  aria-describedby="cb-instructions-hint"
                  value={text}
                  rows={10}
                  readOnly
                  placeholder="Choose the fictional patient below to fill this in."
                />
                <div className="cb-samples">
                  <p className="cb-hint">{ui.trySample}</p>
                  <ul>
                    <li>
                      <button type="button" className="cb-chip" onClick={() => setText(sample.instructions)}>
                        {sample.title}
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="cb-intake-actions">
                  <button type="submit" className="cb-button" disabled={!text}>
                    {ui.makePlan}
                  </button>
                  <span className="cb-hint">{sample.patient}</span>
                </div>
              </form>
              <p className="cb-disclaimer">{ui.introDisclaimer}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
