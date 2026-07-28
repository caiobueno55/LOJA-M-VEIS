import { Link } from 'react-router-dom'
import './product-card.css'

const formatador = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ProductCard({ produto }) {
  return (
    <Link to={`/produtos/${produto.slug}`} className="product-card">
      <div className="product-card-image">
        <img src={produto.imagens[0]} alt={produto.nome} loading="lazy" />
        {produto.destaque && <span className="product-card-badge">Destaque</span>}
      </div>
      <div className="product-card-body">
        <p className="product-card-name">{produto.nome}</p>
        <p className="product-card-desc">{produto.descricao_curta}</p>
        <div className="product-card-footer">
          <p className="product-card-price">{formatador.format(produto.preco)}</p>
          <span className="product-card-action">Ver detalhes</span>
        </div>
      </div>
    </Link>
  )
}
