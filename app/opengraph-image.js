import { ImageResponse } from "next/og";

import { person } from "@/lib/profile";

export const alt = `${person.name}, ${person.role}: complexity, made clear.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DOTS = [
  [8, 12],
  [24, 46],
  [40, 20],
  [56, 50],
  [72, 14],
  [88, 38],
  [104, 26],
  [120, 32],
  [136, 30],
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1F5C4F",
          color: "#F7F9F8",
        }}
      >
        <svg width="440" height="120" viewBox="0 0 220 60">
          {DOTS.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4.5" fill="#EEF2F0" />
          ))}
          <line x1="150" y1="30" x2="212" y2="30" stroke="#E0A33A" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Complexity, made clear.
          </div>
          <div style={{ fontSize: 40, opacity: 0.9 }}>
            {`${person.name} · ${person.role}`}
          </div>
        </div>
      </div>
    ),
    size
  );
}
