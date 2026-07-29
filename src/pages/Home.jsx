import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { categorias } from '../data/categorias.js'
import { carregarProdutos, getDestaques } from '../data/produtos.js'
import { loja, linkWhatsApp } from '../data/loja.js'
import CategoryCard from '../components/CategoryCard.jsx'
import ProductCard from '../components/ProductCard.jsx'
import GrainDivider from '../components/GrainDivider.jsx'
import './home.css'

export default function Home() {
  const [destaques, setDestaques] = useState(() => getDestaques(6))

  useEffect(() => {
    carregarProdutos().then((lista) => {
      setDestaques(lista.filter((produto) => produto.destaque).slice(0, 6))
    })
  }, [])

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Direto da fábrica para sua casa</p>
            <h1 className="hero-title">
              Móveis da fábrica,
              <br /> entrega e montagem.
            </h1>
            <p className="hero-text">
              Na {loja.nome}, você encontra sofás, mesas, cadeiras e móveis para todos os
              ambientes com atendimento direto, entrega combinada e montagem no local.
            </p>
            <div className="hero-actions">
              <Link to="/produtos" className="btn btn-primary">
                Ver produtos
              </Link>
              <a
                href={linkWhatsApp('Olá! Vi o site e quero saber mais sobre os móveis.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <img
              className="hero-img hero-img-main"
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=82"
              alt="Sala de estar com móveis de madeira"
            />
            <img
              className="hero-img hero-img-small"
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=82"
              alt="Detalhe de acabamento em madeira"
            />
          </div>
        </div>
      </section>

      <GrainDivider />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Categorias</p>
              <h2 className="section-title">Encontre pelo ambiente</h2>
            </div>
            <p className="section-sub">
              Da sala ao quarto, organizamos a coleção pra facilitar sua busca.
            </p>
          </div>

          <div className="category-grid">
            {categorias.map((categoria) => (
              <CategoryCard key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Destaques</p>
              <h2 className="section-title">Os queridinhos da loja</h2>
            </div>
            <Link to="/produtos" className="btn btn-outline btn-sm">
              Ver tudo
            </Link>
          </div>

          <div className="product-grid">
            {destaques.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2 className="cta-title">Achou uma peça que combina com você?</h2>
            <p className="cta-text">
              Fale com a gente pelo WhatsApp e a gente te ajuda com medidas, prazos e
              condições.
            </p>
          </div>
          <a
            href={linkWhatsApp('Olá! Gostaria de mais informações sobre os móveis da loja.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
