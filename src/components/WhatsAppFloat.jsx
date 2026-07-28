import { linkWhatsApp } from '../data/loja.js'
import './whatsapp-float.css'

export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={linkWhatsApp('Olá! Vi o site e gostaria de saber mais sobre os móveis.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C10 9 9.4 7.6 9.2 7c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3z" />
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.2L2 22l4.9-1.3C8.3 21.6 10.1 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3 .8.8-2.9-.2-.3C3.6 14.7 3.1 13 3.1 12 3.1 7.1 7.1 3.1 12 3.1S20.9 7.1 20.9 12 16.9 20 12 20z" />
      </svg>
    </a>
  )
}
