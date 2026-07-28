import { Link } from 'react-router-dom'
import CategoryIcon from './CategoryIcon.jsx'
import './category-card.css'

export default function CategoryCard({ categoria }) {
  return (
    <Link to={`/produtos?categoria=${categoria.slug}`} className="category-card">
      <span className="category-icon">
        <CategoryIcon name={categoria.icone} />
      </span>
      <span className="category-name">{categoria.nome}</span>
      <span className="category-desc">{categoria.descricao_curta}</span>
    </Link>
  )
}
