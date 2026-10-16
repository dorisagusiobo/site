// UI/UX case studies, moved from the Webflow site (doriss.webflow.io) and lightly
// edited: template leftovers, duplicated paragraphs and copy-paste errors removed.
// Images live in public/design/<slug>/. Widths and heights are the real file sizes.

const img = (slug, file, width, height, alt) => ({ src: `/design/${slug}/${file}`, width, height, alt });

export const designCases = [
  {
    slug: "accomm-ai",
    // Plain-language summary of the work for the Digital Twin.
    highlights:
      "Problem: 80% of users struggled to make informed booking decisions, and 60% of research participants wanted to research activities and accommodation together. Process: a two-week research sprint with 10+ user interviews, forum and community research, and competitor and SWOT analysis; then an affinity map and customer journey map; then design, starting with a design system, mobile-first, with the homepage and booking funnel first and wireframes in Whimsical. Goal: 500 bookings by the end of 2024.",
    title: "Accomm.ai",
    kind: "Travel booking · Web",
    summary: "An accommodation booking platform that helps traveling families find a stay that truly fits, with the information and filters to choose with confidence.",
    role: "UX/UI design, UX research, user testing",
    tools: "Figma, FigJam, Google Sheets, Typeform, Calendly, Whimsical, Zoom, Zeplin",
    cover: img("accomm-ai", "01.png", 1800, 980, "Accomm.ai booking platform shown on desktop and mobile"),
    outcome: [
      "Launched three months after the project began.",
      "Average daily rate up 10% in the second quarter compared with the first.",
    ],
    links: [
      { label: "Wireframes (Whimsical)", href: "https://whimsical.com/accomm-ai-9q2GSExjx3HQQ9R6By5hPf" },
    ],
    sections: [
      {
        heading: "The context",
        body: [
          "Steve, the founder of Accomm.ai, ran into a problem booking a getaway to Ocean City, Maryland with his partner: there was little relevant, supportive information, and few controls to narrow the search to places that met their needs.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "Many accommodation booking platforms in the U.S. lack comprehensive tools and information, leading 80% of users to struggle to make informed decisions about their stays. Travelers spend longer than expected, and sometimes discover too late that a place is badly located, in an unsafe area, or far from the activities they wanted.",
        ],
      },
      {
        heading: "The goal",
        body: [
          "Launch a well-designed booking platform that helps traveling couples with kids find a personalized stay. In our research, 60% of participants wanted one place to research activities and accommodation together. Solving this well was expected to reach 500 bookings by the end of 2024.",
        ],
      },
      {
        heading: "1. Empathize",
        body: ["An intensive two-week research sprint, focused on frustrations, wants and needs."],
        bullets: [
          "10+ user interviews",
          "Forums, Reddit and Facebook groups",
          "Competitor and SWOT analysis",
        ],
        images: [img("accomm-ai", "03.png", 578, 428, "Research artifacts: competitor comparison, emotion mapping and remote user interviews")],
        takeaways: [
          "Traveling couples want to refine searches until they find the right place.",
          "Every traveler has different expectations and preferences.",
          "Travelers decide around their non-negotiables.",
        ],
      },
      {
        heading: "2. Conceptualize",
        body: ["With a wealth of insights, I prioritized: classifying everything we learned with an affinity map and a customer journey map, then presenting the synthesis to stakeholders."],
        takeaways: [
          "Every trip has a motivation, and different intents create different expectations.",
          "Affordability, basic amenities, accessibility, convenience and security drive the decision.",
          "People remember the peak, low and end of an experience most, so every stay should end on a positive note.",
          "The journey swings between excitement and frustration: juggling budget, choice paralysis and misrepresented listings across many tools.",
        ],
      },
      {
        heading: "3. Design",
        body: ["The deadline was tight and developers needed to start soon, so I answered the key questions first, then designed: a design system as a priority, a mobile-first approach, and the homepage and booking funnel before anything else."],
        bullets: [
          "Search: destination, dates and guests, validated before results.",
          "Filter and sort by occasion, price, style and amenities.",
          "Book from a details overlay or page, validate, then check out and see the booking in “My bookings”.",
        ],
      },
    ],
  },
  {
    slug: "vanguard-assurance",
    // Plain-language summary of the work for the Digital Twin.
    highlights:
      "A hypothetical car insurer whose legacy mainframe software frustrated independent agents. Process: in-depth interviews with insurance agents, personas, a how-might-we statement, a micro journey map of the agent workflow, and user testing with experienced agents using real sales-call questions. Final designs: a dashboard to manage existing quotes, a one-question-per-screen quote form to cut errors during phone calls, and an editable quote summary to share or print.",
    title: "Vanguard Assurance",
    kind: "Insurance · Mobile",
    summary: "Mobile tools that take the complexity out of helping clients buy car insurance, designed from interviews with independent agents.",
    role: "UX research, interaction design, prototyping, user testing",
    tools: "Figma, Miro",
    cover: img("vanguard-assurance", "01.png", 715, 964, "Vanguard Assurance agent app screens"),
    note: "Vanguard Assurance Corporation (VAC) is a hypothetical US car insurer.",
    sections: [
      {
        heading: "Overview",
        body: [
          "VAC's outdated mainframe software was inflexible and hard to update. Independent agents struggled to use it, which cost the business, and earlier attempts to modernize it made things worse.",
        ],
      },
      {
        heading: "My role",
        body: [
          "I led a user-centered process: in-depth interviews with insurance agents to define the problem, then ideation, prototyping and testing, refining the design with each round of feedback.",
        ],
      },
      {
        heading: "Goals",
        bullets: [
          "Accurate, editable and searchable quotes, so agents can create precise, customized quotes quickly.",
          "Train agents on industry best practice and encourage leads, making the platform an educational tool as well as a quoting one.",
        ],
      },
      {
        heading: "Research",
        body: [
          "Frontline agents consistently said their priority was getting proposals to clients with minimal delay, but administrative bottlenecks slowed them down: a systemic issue for both efficiency and customer satisfaction.",
        ],
        images: [img("vanguard-assurance", "03.png", 1766, 1208, "Industry research summary")],
      },
      {
        heading: "Personas",
        images: [
          img("vanguard-assurance", "04.png", 1628, 930, "Agent persona one"),
          img("vanguard-assurance", "05.png", 1626, 959, "Agent persona two"),
        ],
      },
      {
        heading: "How might we",
        quote: "How might we design a more centralized, manageable app that makes it easier for managers and agents to give accurate quotes and consistently reliable service?",
      },
      {
        heading: "Challenges and scope",
        body: [
          "The design had to work with legacy systems and a large volume of private data. The transition had to be smooth for agents, especially senior agents, which meant a front-end redesign that minimized disruption and back-end changes to migrate data properly.",
        ],
      },
      {
        heading: "Agent journey map",
        body: [
          "Breaking the agent's workflow into micro-steps showed a clear pattern: the current process left agents frustrated while completing questionnaires with customers, which raised the risk of errors before quotes were finalized.",
        ],
        images: [img("vanguard-assurance", "06.jpg", 1778, 1268, "Agent micro journey map")],
      },
      {
        heading: "User testing",
        body: [
          "Working with experienced agents, I added common questions from real sales calls to the app, then tested question complexity, found where the experience became tedious, and watched for drop-off points.",
        ],
        images: [img("vanguard-assurance", "07.png", 1581, 594, "User testing results")],
      },
      {
        heading: "Final design: manage existing quotes",
        body: [
          "Agents can finish unsubmitted quotes and check recent ones from one place, and follow each quote's status.",
        ],
        images: [img("vanguard-assurance", "08.png", 377, 814, "Quotes dashboard screen")],
      },
      {
        heading: "Final design: one question per screen",
        body: [
          "Long forms are tedious and hard to fill in accurately while on the phone with a customer. Splitting the form into separate screens lets agents present each question clearly and confirm the answer, reducing errors.",
        ],
        images: [
          img("vanguard-assurance", "09.png", 1333, 814, "Step-by-step quote form screens"),
          img("vanguard-assurance", "10.png", 377, 814, "Quote summary screen"),
        ],
      },
      {
        heading: "Final design: editable quote summary",
        body: [
          "Agents can review and correct details after entry, then share or print the quote so the customer gets a clear overview.",
        ],
        images: [img("vanguard-assurance", "11.png", 1637, 1800, "Editable quote summary screens")],
      },
    ],
  },
  {
    slug: "wilderness-tourism",
    // Plain-language summary of the work for the Digital Twin.
    highlights:
      "Helping local tourism businesses recover after the pandemic by serving sustainability-minded visitors instead of competing on price. The project research included a stakeholder session with three business owners, a persona (Huyen), design principles (personalized exploration, authentic relationships, broad inclusivity), and a minimalist, vibrant mood board and color palette. Her part was the low- and high-fidelity mockups in Adobe XD, focused on navigation: a dashboard with curated tour categories and Loyalty Leaf rewards.",
    title: "Wilderness Tourism",
    kind: "Sustainable tourism · Mobile",
    summary: "A mobile app that helps local wilderness tourism businesses recover after the pandemic by serving sustainability-minded visitors.",
    role: "Low- and high-fidelity mockups focused on improving navigation",
    tools: "Adobe XD",
    cover: img("wilderness-tourism", "02.png", 679, 1005, "Tour detail screens for Lynn Valley cave"),
    sections: [
      {
        heading: "Tourism's uncertain road ahead",
        body: [
          "Travel restrictions have lifted, but local wilderness tourism is far from recovered. Limited pandemic funding left many businesses financially strained, some unable to reopen fully or rehire, and the risk of future disruption makes resilient, adaptive strategies essential.",
        ],
      },
      {
        heading: "My role",
        body: [
          "I created the low- and high-fidelity mockups in Adobe XD, focusing on improvements to navigation.",
        ],
      },
      {
        heading: "Pain points",
        body: [
          "Research showed the community needed to move from price wars to meeting visitor needs for long-term engagement and loyalty.",
        ],
        bullets: [
          "Monetary strain: with revenue down and costs and debt up, discounting would erode already thin margins.",
          "User preferences: people were less drawn to budget options and more to tailored, well-researched experiences that match their interests and values.",
        ],
      },
      {
        heading: "Interview insights",
        body: ["A stakeholder session with three business owners and entrepreneurs surfaced three themes."],
        bullets: [
          "Value-added rewards: users want rewards that improve the experience, such as exclusive event access or loyalty points for future activities.",
          "Timely engagement: businesses need to engage users before the busy season starts in May.",
          "Adapting to evolving needs: immediate rewards matter, and so do long-term trends toward sustainability.",
        ],
      },
      {
        heading: "Problem statement",
        quote: "How might we help seasonal tourism businesses shift their focus to serve a broader, sustainability-conscious consumer base?",
      },
      {
        heading: "Target audience",
        body: [
          "People who prioritize healthy living and sustainable practices. They are less sensitive to price, recover faster financially, and have a natural affinity for eco-friendly travel.",
        ],
        images: [
          img("wilderness-tourism", "03.jpg", 1220, 584, "Outdoor activity imagery for the target audience"),
          img("wilderness-tourism", "04.jpg", 924, 574, "Outdoor activity imagery for the target audience"),
        ],
      },
      {
        heading: "Persona: Huyen, communication coordinator, Los Angeles",
        body: [
          "Huyen enjoys occasional outdoor activities and chooses brands that match her social and environmental values. Social media inspires where she goes; accessibility, safety and affordability shape her plans.",
        ],
        bullets: [
          "Goal: make a positive impact through eco-conscious activities and support local businesses.",
          "Pain point: “sustainability” is often vague or misused.",
          "Pain point: unclear which activities fit both her interests and her values, and how to visit Indigenous lands respectfully.",
        ],
      },
      {
        heading: "Design principles",
        bullets: [
          "Personalized exploration: recommendations shaped by preferences, past activities and behavior, going beyond cost.",
          "Authentic relationships",
          "Broad inclusivity",
        ],
      },
      {
        heading: "Branding",
        body: [
          "A minimalist, vibrant mood board: simplicity for easy interaction, with vibrant accents for energy and positivity. The color palette is deliberately spirited and inviting, to encourage sign-ups and sustainable action.",
        ],
        images: [
          img("wilderness-tourism", "06.jpg", 1530, 792, "Mood board"),
          img("wilderness-tourism", "07.png", 800, 485, "Color palette"),
        ],
      },
      {
        heading: "Dashboard",
        body: [
          "Curated tour categories make it easy to find tours that match your interests, and a swipeable “Popular” section surfaces top-rated experiences.",
        ],
        images: [
          img("wilderness-tourism", "09.png", 786, 1660, "Dashboard screen"),
          img("wilderness-tourism", "10.png", 1124, 1367, "Dashboard screens"),
        ],
      },
      {
        heading: "Loyalty Leaf rewards",
        body: [
          "Every user earns points toward exclusive discounts and offers tailored to them. Milestones unlock discounts on merchandise, event tickets and custom experiences.",
        ],
        images: [
          img("wilderness-tourism", "11.png", 786, 1660, "Rewards screen"),
          img("wilderness-tourism", "12.png", 1728, 865, "Rewards screens"),
          img("wilderness-tourism", "13.png", 1475, 865, "Rewards screens"),
        ],
      },
    ],
  },
  {
    slug: "second-hand-furniture",
    // Plain-language summary of the work for the Digital Twin.
    highlights:
      "Making used furniture easier to find, buy and move. Process: research with participants and affinity clustering of pain points and behaviors, a persona (Maika), a user journey map, branding with the Lexend typeface for legibility, and low-fidelity sketches. Designs: item listings, search by photo, detailed filters and in-app chat with sellers.",
    title: "Second-Hand Furniture",
    kind: "Marketplace · Mobile",
    summary: "An app that takes the hassle out of buying and selling used furniture, with better search, direct seller chat and search by photo.",
    role: "Research, branding, sketching and high-fidelity UI design",
    cover: img("second-hand-furniture", "01.png", 973, 1033, "Second-hand furniture app screens"),
    sections: [
      {
        heading: "Challenges",
        body: [
          "Existing marketplaces make it hard to find furniture that fits specific needs and constraints: filters are thin, so searching is slow and frustrating.",
        ],
        images: [img("second-hand-furniture", "02.png", 1150, 1468, "Furniture marketplace challenges")],
      },
      {
        heading: "Research",
        body: [
          "Research participants shaped the core features. They highlighted handling pickup and delivery, and staying within budget, as key pain points. Affinity clustering of feedback and observed behavior showed how people actually search for used furniture.",
        ],
        images: [img("second-hand-furniture", "03.png", 1205, 770, "Pain points and behaviors from research")],
      },
      {
        heading: "Value proposition",
        bullets: [
          "Efficient, customizable search: filters for budget, location and condition.",
          "Seamless communication: in-app chat to negotiate and arrange logistics securely.",
          "Visual search: find the closest match to furniture you've seen by taking a photo.",
        ],
      },
      {
        heading: "Persona: Maika, policy coordinator, San Francisco",
        body: [
          "Maika lives alone in a studio and loves interior design. She's open to second-hand pieces, but without a car she usually buys new and has items delivered.",
        ],
        bullets: [
          "Goals: affordable shipping for second-hand pieces, help finding items she's seen, furnishing her space in her own style.",
          "Pain points: a tight budget, no car, and no easy way to move and set up heavy items alone.",
        ],
      },
      {
        heading: "User journey map",
        body: [
          "A journey map from discovery through transaction to long-term loyalty identified the key touchpoints, pain points and opportunities.",
        ],
        images: [img("second-hand-furniture", "05.jpg", 1530, 828, "User journey map")],
      },
      {
        heading: "Branding",
        body: [
          "I defined brand colors, keywords and guiding principles. Lexend was chosen as the typeface for its clean, highly legible letterforms, supporting an accessible interface. Supplementary imagery blends natural and man-made elements, echoing sustainable living with modern convenience.",
        ],
        images: [
          img("second-hand-furniture", "06.png", 728, 399, "Typography: Lexend"),
          img("second-hand-furniture", "07.png", 1614, 998, "Supplementary brand imagery"),
        ],
      },
      {
        heading: "Low-fidelity sketches",
        body: ["Early sketches, drawn from my mood board and references, mapped the layout, flow and key components."],
        images: [img("second-hand-furniture", "08.png", 1530, 709, "Low-fidelity sketches")],
      },
      {
        heading: "High-fidelity design",
        bullets: [
          "Item listings: clean and minimal, led by the seller's photos, with price, condition and location at a glance.",
          "Search by images: take or upload a photo to find the closest match nearby.",
          "Filter options: designed to give people more control and precision.",
        ],
        images: [
          img("second-hand-furniture", "09.png", 812, 851, "Item listing screens"),
          img("second-hand-furniture", "10.png", 1296, 1269, "Listing detail screens"),
          img("second-hand-furniture", "12.png", 1800, 886, "Search by image flow"),
          img("second-hand-furniture", "11.png", 1681, 2708, "Filter screens"),
        ],
      },
    ],
  },
  {
    slug: "mastery-hub",
    // Plain-language summary of the work for the Digital Twin.
    highlights:
      "Closing skills gaps in fields like machine learning, cloud and AI. Process: design thinking (define, ideate, prototype, test), a competitor analysis of Udemy and Coursera, personas and a learner journey, and user flows for both learners and instructors. Designs: Figma wireframes and a responsive final design with forums, live sessions and collaboration tools.",
    title: "Mastery Hub",
    kind: "Online learning · Web",
    summary: "An online learning platform with accessible courses in technology and business, designed to help people upskill for in-demand roles.",
    role: "UI designer",
    tools: "Figma, FigJam, Google Sheets, Typeform, Calendly, Whimsical, Zoom, Zeplin",
    cover: img("mastery-hub", "01.png", 1800, 978, "Mastery Hub platform overview"),
    links: [
      { label: "Wireframes (Figma)", href: "https://www.figma.com/design/kgb2AiWDzsGqjMTIBFVJjE/MasteryHub-wireframe?node-id=60-589&t=weLttTrjHEhKWOe4-1" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Industries everywhere lack skilled specialists in fields like machine learning, cloud computing, AI and business intelligence, and the need for up-to-date training keeps growing.",
        ],
      },
      {
        heading: "The goal",
        body: [
          "A leading online learning platform with diverse courses across technology and business: high-quality, accessible education for learners worldwide who want to upskill and advance their careers.",
        ],
      },
      {
        heading: "Process",
        body: ["I followed design thinking: define the problem, ideate, prototype and test."],
        images: [img("mastery-hub", "02.png", 1800, 643, "Design thinking process")],
      },
      {
        heading: "Competitor analysis: Udemy and Coursera",
        bullets: [
          "Udemy: huge, affordable, self-paced catalog, but quality varies and certificates aren't accredited.",
          "Coursera: university partners and accredited certificates and degrees, but costs can be a barrier and hands-on projects can lack depth.",
          "Both: crowded market, fast-changing technology, and limited real-time help from instructors.",
        ],
      },
      {
        heading: "Personas and journey",
        bullets: [
          "Audience: ages 18 to 65 worldwide, motivated by new skills for career advancement.",
          "Journey: discover while seeking IT skills, compare courses and reviews, enroll, learn through materials and live sessions, join discussions and projects, then certify and join the alumni network.",
        ],
        images: [img("mastery-hub", "05.jpg", 1248, 678, "Homepage on mobile")],
      },
      {
        heading: "User flows",
        bullets: [
          "Learners: spark curiosity, then guide people to courses that match their career goals; existing students see their coursework and progress in one place.",
          "Instructors: a single dashboard for student performance and course progress.",
        ],
      },
      {
        heading: "Wireframes and final design",
        body: [
          "Wireframes let stakeholders check flows, content placement and scalability early. The final design is user-centered and responsive, with clear information architecture and engagement features like forums, live sessions and collaboration tools.",
        ],
        images: [
          img("mastery-hub", "06.jpg", 1072, 1412, "Key page wireframe"),
          img("mastery-hub", "07.jpg", 1084, 1369, "High-fidelity design"),
        ],
      },
    ],
  },
  {
    slug: "bluestock",
    // Plain-language summary of the work for the Digital Twin.
    highlights:
      "Visual UI design shown on phone, desktop and display mockups. There is no written case study for it yet.",
    title: "BlueStock",
    kind: "Visual design",
    summary: "A visual UI design study shown across phone, desktop and display mockups.",
    role: "UI designer",
    cover: img("bluestock", "01.jpg", 1800, 978, "BlueStock overview"),
    sections: [
      {
        heading: "Screens",
        images: [
          img("bluestock", "02.png", 1248, 928, "BlueStock on a phone"),
          img("bluestock", "03.png", 1248, 933, "BlueStock on a desktop"),
          img("bluestock", "04.jpg", 1248, 963, "BlueStock on a display"),
        ],
      },
    ],
  },
];

export const getDesignCase = (slug) => designCases.find((item) => item.slug === slug);
