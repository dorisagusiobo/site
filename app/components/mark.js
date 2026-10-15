// The brand mark: scattered points settling into one clear line.
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

export default function Mark({ className = "", animated = false, title }) {
  return (
    <svg
      className={`mark ${animated ? "mark-animated" : ""} ${className}`}
      viewBox="0 0 220 60"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g className="mark-dots">
        {DOTS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4.5" style={{ "--i": i, "--dy": `${30 - cy}px` }} />
        ))}
      </g>
      <line className="mark-line" x1="150" y1="30" x2="212" y2="30" />
    </svg>
  );
}
