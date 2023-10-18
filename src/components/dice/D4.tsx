export function D4({ value, size = 5 }: { value: number; size?: number }) {
  return (
    <svg
      style={{ width: `${size}rem`, height: `${size}rem` }}
      viewBox="0 0 31 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 25L14 1l16 11.5L24.5 25H1z" fill="#5DE6F0" />
      <path d="M14 1l10.5 24L30 12.5 14 1z" fill="#03A1B8" />
      <path
        d="M14 1L1 25h23.5M14 1l10.5 24M14 1l16 11.5L24.5 25"
        stroke="#013648"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="11" y="19" fontSize="7" fill="black">
        {value}
      </text>
    </svg>
  );
}
