import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categorias } from '../data/categorias.js'
import { carregarProdutos, getProdutos } from '../data/produtos.js'
import ProductCard from '../components/ProductCard.jsx'
import './produtos.css'

export default function Produtos() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriaAtiva = searchParams.get('categoria') || 'todos'
  const [busca, setBusca] = useState('')
  const [produtos, setProdutos] = useState(() => getProdutos())

  useEffect(() => {
    window.scrollTo({ top: 0 })
    carregarProdutos().then(setProdutos)
  }, [])

  const listaFiltrada = useMemo(() => {
    return produtos.filter((p) => {
      const bateCategoria = categoriaAtiva === 'todos' || p.categoria_slug === categoriaAtiva
      const bateBusca = p.nome.toLowerCase().includes(busca.toLowerCase())
      return bateCategoria && bateBusca
    })
  }, [categoriaAtiva, busca, produtos])

  function selecionarCategoria(slug) {
    if (slug === 'todos') {
      searchParams.delete('categoria')
    } else {
      searchParams.set('categoria', slug)
    }
    setSearchParams(searchParams)
  }

  return (
    <section className="section produtos-page">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h1 className="section-title">Nossos produtos</h1>
          </div>
          <input
            type="search"
            className="produtos-busca"
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Buscar produto por nome"
          />
        </div>

        <div className="filtro-tabs" role="tablist" aria-label="Filtrar por categoria">
          <button
            role="tab"
            aria-selected={categoriaAtiva === 'todos'}
            className={`filtro-tab ${categoriaAtiva === 'todos' ? 'filtro-tab-ativo' : ''}`}
            onClick={() => selecionarCategoria('todos')}
          >
            Todos
          </button>
          {categorias.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={categoriaAtiva === c.slug}
              className={`filtro-tab ${categoriaAtiva === c.slug ? 'filtro-tab-ativo' : ''}`}
              onClick={() => selecionarCategoria(c.slug)}
            >
              {c.nome}
            </button>
          ))}
        </div>

        {listaFiltrada.length > 0 ? (
          <div className="product-grid produtos-grid">
            {listaFiltrada.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        ) : (
          <div className="produtos-vazio">
            <p>Nenhum produto encontrado com esse filtro.</p>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                selecionarCategoria('todos')
                setBusca('')
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
