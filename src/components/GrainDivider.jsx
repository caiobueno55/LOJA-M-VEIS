export default function GrainDivider({ flip = false }) {
  return (
    <svg
      className={`grain-divider ${flip ? 'grain-flip' : ''}`}
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 20 C 150 5, 300 35, 450 20 S 750 5, 900 20 S 1050 35, 1200 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.5"
      />
      <path
        d="M0 26 C 150 12, 300 40, 450 26 S 750 12, 900 26 S 1050 40, 1200 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  )
}
