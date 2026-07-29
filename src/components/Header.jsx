import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { loja } from '../data/loja.js'
import './header.css'

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/produtos', label: 'Produtos' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
  { to: '/admin', label: 'ADM' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-bar">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-name">{loja.nome}</span>
        </NavLink>

        <nav className={`nav ${open ? 'nav-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <a href="/contato" className="btn btn-accent btn-sm header-cta">
            Fale conosco
          </a>
          <button
            className="nav-toggle"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
