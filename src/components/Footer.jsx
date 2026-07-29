import { Link } from 'react-router-dom'
import { loja } from '../data/loja.js'
import { categorias } from '../data/categorias.js'
import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand-mark">M</div>
          <p className="footer-name">{loja.nome}</p>
          <p className="footer-slogan">{loja.slogan}</p>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Navegação</p>
          <Link to="/">Início</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Categorias</p>
          {categorias.slice(0, 4).map((c) => (
            <Link key={c.id} to={`/produtos?categoria=${c.slug}`}>
              {c.nome}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <p className="footer-heading">Contato</p>
          <p className="footer-text">{loja.endereco.linha1}</p>
          <p className="footer-text">{loja.endereco.linha2}</p>
          <p className="footer-text">{loja.telefoneExibicao}</p>
          <p className="footer-text">{loja.horario}</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 JHL Móveis. Desenvolvido por Caio Bueno - Direitos Autorias Reservados</p>
      </div>
    </footer>
  )
}
