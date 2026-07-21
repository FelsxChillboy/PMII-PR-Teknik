export default function ThreadMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 220 C 180 60, 320 260, 480 130 S 780 40, 940 170 S 1100 90, 1180 60"
        stroke="var(--color-marigold-500)"
        strokeWidth="2"
        strokeDasharray="1 10"
        strokeLinecap="round"
      />
      <path
        d="M20 220 C 180 60, 320 260, 480 130 S 780 40, 940 170 S 1100 90, 1180 60"
        stroke="var(--color-forest-700)"
        strokeWidth="1"
        opacity="0.3"
      />
      {[
        [20, 220],
        [270, 165],
        [480, 130],
        [660, 60],
        [940, 170],
        [1180, 60],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i % 2 === 0 ? 6 : 4}
          fill={i % 2 === 0 ? "var(--color-marigold-500)" : "var(--color-clay-500)"}
        />
      ))}
    </svg>
  );
}
