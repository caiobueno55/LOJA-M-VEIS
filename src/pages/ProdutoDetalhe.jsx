import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { carregarProdutos, getProdutoBySlug } from '../data/produtos.js'
import { getCategoriaBySlug } from '../data/categorias.js'
import { linkWhatsApp } from '../data/loja.js'
import ProductCard from '../components/ProductCard.jsx'
import './produto-detalhe.css'

const formatador = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ProdutoDetalhe() {
  const { id } = useParams()
  const [produto, setProduto] = useState(() => getProdutoBySlug(id))
  const [relacionados, setRelacionados] = useState([])
  const [imagemAtiva, setImagemAtiva] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setImagemAtiva(0)
    carregarProdutos().then((lista) => {
      const encontrado = lista.find((item) => item.slug === id)
      setProduto(encontrado)
      setRelacionados(
        lista
          .filter((item) => item.categoria_slug === encontrado?.categoria_slug && item.id !== encontrado.id)
          .slice(0, 4),
      )
    })
  }, [id])

  if (!produto) {
    return <Navigate to="/produtos" replace />
  }

  const categoria = getCategoriaBySlug(produto.categoria_slug)
  const mensagemWhatsApp = `Olá! Tenho interesse no produto "${produto.nome}" (vi no site). Pode me passar mais informações?`

  return (
    <section className="section produto-detalhe">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Início</Link> <span>/</span> <Link to="/produtos">Produtos</Link>{' '}
          <span>/</span>{' '}
          {categoria && (
            <>
              <Link to={`/produtos?categoria=${categoria.slug}`}>{categoria.nome}</Link>{' '}
              <span>/</span>{' '}
            </>
          )}
          <span className="breadcrumb-atual">{produto.nome}</span>
        </div>

        <div className="produto-grid">
          <div className="produto-galeria">
            <div className="produto-imagem-principal">
              <img src={produto.imagens[imagemAtiva]} alt={produto.nome} />
            </div>
            {produto.imagens.length > 1 && (
              <div className="produto-thumbs">
                {produto.imagens.map((src, i) => (
                  <button
                    key={src}
                    className={`produto-thumb ${i === imagemAtiva ? 'produto-thumb-ativo' : ''}`}
                    onClick={() => setImagemAtiva(i)}
                    aria-label={`Ver imagem ${i + 1} de ${produto.nome}`}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="produto-info">
            {categoria && <p className="eyebrow">{categoria.nome}</p>}
            <h1 className="produto-nome">{produto.nome}</h1>
            <p className="produto-preco">{formatador.format(produto.preco)}</p>
            <p className="produto-descricao">{produto.descricao}</p>

            <a
              href={linkWhatsApp(mensagemWhatsApp)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent produto-cta"
            >
              Perguntar no WhatsApp
            </a>

            <div className="produto-specs">
              <p className="produto-specs-titulo">Especificações</p>
              <dl>
                {Object.entries(produto.especificacoes).map(([chave, valor]) => (
                  <div key={chave} className="produto-spec-row">
                    <dt>{chave}</dt>
                    <dd>{valor}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="produto-relacionados">
            <div className="section-head">
              <div>
                <p className="eyebrow">Você também pode gostar</p>
                <h2 className="section-title">Produtos relacionados</h2>
              </div>
            </div>
            <div className="product-grid">
              {relacionados.map((p) => (
                <ProductCard key={p.id} produto={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
