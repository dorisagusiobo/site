import "./globals.css";

export const metadata = {
  title: "Doris Agusiobo-Echianu — AI/ML Engineer",
  description:
    "AI/ML Engineer building agentic systems, scalable cloud solutions, and production-grade generative AI products.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
