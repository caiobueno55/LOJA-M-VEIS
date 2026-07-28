const paths = {
  sofa: (
    <>
      <path d="M4 12v5a1 1 0 0 0 1 1h1v2h2v-2h8v2h2v-2h1a1 1 0 0 0 1-1v-5" />
      <path d="M4 12V9a2 2 0 0 1 2-2h1v5H5a1 1 0 0 1-1-2z" />
      <path d="M20 12V9a2 2 0 0 0-2-2h-1v5h2a1 1 0 0 0 1-2z" />
      <rect x="7" y="7" width="10" height="7" rx="1" />
    </>
  ),
  mesa: (
    <>
      <path d="M3 8h18" />
      <path d="M5 8v10" />
      <path d="M19 8v10" />
      <path d="M3 8l2-3h14l2 3" />
    </>
  ),
  cadeira: (
    <>
      <path d="M6 4v9" />
      <path d="M6 13h11" />
      <path d="M17 4v16" />
      <path d="M6 13v7" />
    </>
  ),
  estante: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M4 9h16" />
      <path d="M4 15h16" />
    </>
  ),
  quarto: (
    <>
      <path d="M3 19v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 19h18" />
      <path d="M3 13V7a1 1 0 0 1 1-1h6v5" />
    </>
  ),
  decoracao: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
}

export default function CategoryIcon({ name, size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.decoracao}
    </svg>
  )
}
