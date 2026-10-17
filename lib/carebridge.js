// The CareBridge case study (/work/carebridge). Every number here comes from the
// build: test counts, timings and limits were measured, not estimated.

const img = (file, width, height, alt) => ({ src: `/work/carebridge/${file}`, width, height, alt });

export const carebridge = {
  slug: "carebridge",
  title: "CareBridge",
  kind: "Healthcare AI · Web app",
  summary:
    "Turns hospital discharge instructions into a plain-language care plan a patient can follow at home, and never lets the AI decide when something is an emergency.",
  live: "https://carebridge-ojwt.onrender.com",
  code: "https://github.com/dorisagusiobo/carebridge",
  meta: [
    { label: "Role", value: "Product design, AI engineering and full-stack development, solo" },
    { label: "Built with", value: "Claude Haiku 5.5 (OpenRouter), FastAPI, Next.js, Docker, Render" },
    { label: "Timeline", value: "7 days, October 2026" },
    { label: "Status", value: "Live demo with fictional patients" },
  ],
  stats: [
    { value: "10", label: "languages, with a check that keeps every number" },
    { value: "~7 s", label: "to turn instructions into a plan" },
    { value: "178", label: "automated tests; 100% backend coverage" },
    { value: "0", label: "patient data stored on the server" },
  ],
  sections: [
    {
      heading: "The problem",
      body: [
        "Discharge paperwork is written for clinicians: “Furosemide 40 mg PO daily”, “Albuterol q4-6h PRN SOB”, “F/u with PCP”. Patients go home unsure what to take, what to avoid and when to worry.",
        "A plain-language summary helps, but in healthcare an AI that sounds confident and gets one detail wrong is worse than no AI at all. The real problem was making the explanation trustworthy.",
      ],
    },
    {
      heading: "The idea",
      body: [
        "It started from a table of industry AI use cases. Healthcare listed two ideas side by side: generative AI that summarizes medical notes, and agents that follow up with patients. Most tools aim the first at doctors. CareBridge points both at the patient: explain the instructions, then check in every day.",
      ],
    },
    {
      heading: "What it does",
      bullets: [
        "Explains: paste the instructions and get a plan with medicines, appointments, self-care, things to avoid and warning signs, in about a 6th-grade reading level.",
        "Puts urgency first: warning signs are grouped by what to do (call 911, go to the emergency room, or call the care team), with the most urgent first.",
        "Checks in: a daily check-in asks about warning signs, doses and self-care. Report a warning sign and the app tells you what to do right away.",
        "Speaks the patient's language: 10 languages, chosen on the very first screen before pasting anything. The plan arrives already translated, every button and alert is translated too, Arabic is laid out right to left, and the plan can be read aloud by the device's own voices.",
      ],
      images: ["paste", "plan"],
    },
    {
      heading: "How it stays safe",
      body: ["The AI extracts; it never advises. Five rules, all enforced in code:"],
      bullets: [
        "Every item must quote the instructions. Each medicine, appointment, warning sign and key point, and even the line saying why the patient was in hospital, comes with a word-for-word quote, and code drops anything whose quote isn't really there. The plan can't contain something the care team didn't write.",
        "No guessed purposes. If the paperwork doesn't say what a medicine is for, the plan doesn't either.",
        "Code reads what to do about each warning sign (“CALL 911 IF”, “Return to the ER”) from the text around it. The model's own label is only a fallback.",
        "Emergency signs always escalate. Fixed rules based on the American College of Emergency Physicians' warning signs (via MedlinePlus) raise signs like blue lips or trouble breathing to “Call 911”, even when the paperwork just says “seek care”. Rules only ever raise urgency, and the plan says why.",
        "Gaps become questions. A missing date or duration becomes a question to ask the care team, never a guess.",
      ],
      images: ["warnings"],
    },
    {
      heading: "Design decisions",
      bullets: [
        "Atkinson Hyperlegible for body text, a typeface the Braille Institute designed for readers with low vision.",
        "Its own “Harbor” palette of harbor blue, navy and violet, chosen so nothing competes with the red, orange and amber of the warning levels. Every text pair passes WCAG AA in light and dark mode.",
        "“Show where each line came from” reveals the quote behind every item, so a patient or caregiver can check the plan against the paperwork.",
        "A missed dose never gets dosing advice, only “ask your care team or pharmacist”.",
        "Privacy by default: the plan and check-ins live in the browser only, and nothing is stored on the server or written to its logs.",
      ],
      images: ["medicines", "checkin"],
    },
    {
      heading: "What testing changed",
      body: ["The most useful part of the build was what broke:"],
      bullets: [
        "The first model produced malformed plans and took up to 82 seconds. Switching to Claude Haiku 5.5 brought plans down to 4–10 seconds with genuinely plain language.",
        "The model labeled “dizziness” as call 911 when the paperwork said call your doctor. That's why code, not the model, now reads the instructed action.",
        "The quote check was too strict at first and dropped four warning signs from a pneumonia plan. Losing a warning sign is the worst failure for this app, so the check now accepts quotes whose parts all appear in the text, while still rejecting invented ones.",
        "The Arabic translation wrote “1 to 2 weeks” in words. The number check kept that line in English, exactly as designed, and a sharper instruction fixed the cause.",
        "Taking screenshots for this page showed the one free-text summary adding an explanation the paperwork didn't contain (“the germs reached your lungs”). The summary became quoted key points, and the reason for the stay now has to quote where the instructions name the condition.",
        "On the live demo, a faked network header got past the usage limit. Visitors are now identified by an address Cloudflare sets itself, and the bypass was re-tested and closed.",
      ],
      images: ["spanish"],
    },
    {
      heading: "Limits and what's next",
      bullets: [
        "The emergency rules match words, so an unusual phrasing (“his lips look a funny color”) could slip past them. The sign still shows at the level the instructions gave it.",
        "The plan lives on one device, by design, so it doesn't follow the patient to another phone.",
        "AI translation isn't a medical interpreter, and the app says so.",
        "It hasn't been reviewed by clinicians or tested with patients. Those come before anything beyond a demo, along with reading a photo of the paperwork.",
      ],
    },
  ],
};

// Screenshots of the app with a fictional patient, captured with Playwright.
export const carebridgeImages = {
  paste: img("01-paste.png", 976, 1198, "Instructions pasted from a fictional pneumonia patient, ready to turn into a plan"),
  plan: img("02-plan.png", 976, 964, "The top of the plan: the condition the instructions name, and the most important things to do, each with its own quote"),
  warnings: img("03-warnings.png", 976, 1352, "Warning signs grouped by urgency, with confusion, blue lips and trouble breathing moved up to Call 911 and the reason shown"),
  medicines: img("04-medicines.png", 976, 830, "Medicines with plain-language schedules"),
  checkin: img("05-checkin.png", 976, 308, "A daily check-in reporting blue lips, answered with Call 911 now"),
  spanish: img("06-spanish.png", 976, 1022, "The same plan in Spanish: every heading and button is translated too"),
};
