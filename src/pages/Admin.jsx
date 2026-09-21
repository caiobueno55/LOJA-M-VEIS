import { useState } from 'react'
import { categorias } from '../data/categorias.js'
import { atualizarProduto, carregarProdutos, criarProduto, excluirProduto, salvarProduto } from '../data/produtos.js'
import './admin.css'

const SENHA_ADMIN = 'admin123'

const inicial = {
  nome: '',
  categoria_slug: 'sofas',
  preco: '',
  destaque: true,
  descricao_curta: '',
  descricao: '',
  imagens: '',
  dimensoes: '',
  material: '',
  cor: '',
  peso: '',
  garantia: '12 meses',
}

function produtoParaForm(produto) {
  const especificacoes = produto.especificacoes || {}

  return {
    nome: produto.nome || '',
    categoria_slug: produto.categoria_slug || 'sofas',
    preco: produto.preco ?? '',
    destaque: Boolean(produto.destaque),
    descricao_curta: produto.descricao_curta || '',
    descricao: produto.descricao || '',
    imagens: Array.isArray(produto.imagens) ? produto.imagens.join('\n') : '',
    dimensoes: especificacoes.Dimensões || especificacoes.Dimensoes || '',
    material: especificacoes.Material || '',
    cor: especificacoes.Cor || '',
    peso: especificacoes.Peso || '',
    garantia: especificacoes.Garantia || '12 meses',
  }
}

export default function Admin() {
  const [autenticado, setAutenticado] = useState(
    () => typeof sessionStorage !== 'undefined' && sessionStorage.getItem('jhl-admin-auth') === 'true',
  )
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [adminSecret, setAdminSecret] = useState(
    () => localStorage.getItem('jhl-admin-secret') || '',
  )
  const [form, setForm] = useState(inicial)
  const [produtosAdmin, setProdutosAdmin] = useState([])
  const [produtoEditando, setProdutoEditando] = useState(null)

  function entrar(event) {
    event.preventDefault()
    if (senha !== SENHA_ADMIN) {
      setErro('Senha incorreta. Para demonstracao, use admin123.')
      return
    }
    sessionStorage.setItem('jhl-admin-auth', 'true')
    setAutenticado(true)
    setErro('')
  }

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function cancelarEdicao() {
    setProdutoEditando(null)
    setForm(inicial)
    setErro('')
    setSucesso('')
  }

  async function salvar(event) {
    event.preventDefault()
    if (!form.nome.trim() || !form.preco || !form.descricao_curta.trim()) {
      setErro('Preencha nome, preco e descricao curta.')
      return
    }

    setSalvando(true)
    setErro('')
    setSucesso('')
    try {
      localStorage.setItem('jhl-admin-secret', adminSecret)
      const produto = produtoEditando
        ? {
            ...criarProduto(form),
            id: produtoEditando.id,
            slug: produtoEditando.slug,
          }
        : criarProduto(form)
      const resposta = produtoEditando
        ? await atualizarProduto(produto, adminSecret)
        : await salvarProduto(produto, adminSecret)

      setProdutosAdmin(resposta.produtos)
      setForm(inicial)
      setProdutoEditando(null)
      setSucesso(produtoEditando ? 'Produto atualizado no catalogo.' : 'Produto salvo no produtos.json pelo GitHub.')
    } catch (error) {
      setErro(error.message)
    } finally {
      setSalvando(false)
    }
  }

  async function sincronizar() {
    setSalvando(true)
    setErro('')
    setSucesso('')
    try {
      const lista = await carregarProdutos()
      setProdutosAdmin(lista)
      setSucesso('Produtos carregados do catalogo publicado.')
    } catch (error) {
      setErro(error.message)
    } finally {
      setSalvando(false)
    }
  }

  function editar(produto) {
    setProdutoEditando(produto)
    setForm(produtoParaForm(produto))
    setErro('')
    setSucesso('')
  }

  async function remover(produto) {
    const confirmar = window.confirm(`Excluir "${produto.nome}" do catalogo?`)

    if (!confirmar) {
      return
    }

    setSalvando(true)
    setErro('')
    setSucesso('')
    try {
      localStorage.setItem('jhl-admin-secret', adminSecret)
      const resposta = await excluirProduto(produto.id, adminSecret)
      setProdutosAdmin(resposta.produtos)
      if (produtoEditando?.id === produto.id) {
        setProdutoEditando(null)
        setForm(inicial)
      }
      setSucesso('Produto excluido do catalogo.')
    } catch (error) {
      setErro(error.message)
    } finally {
      setSalvando(false)
    }
  }

  if (!autenticado) {
    return (
      <section className="section admin-page">
        <div className="container admin-login-wrap">
          <form className="admin-login" onSubmit={entrar}>
            <p className="eyebrow">Acesso ADM</p>
            <h1 className="section-title">Entrar no painel</h1>
            <label className="admin-field">
              <span>Senha</span>
              <input
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="Digite a senha"
              />
            </label>
            {erro && <p className="admin-error">{erro}</p>}
            <button className="btn btn-primary" type="submit">
              Acessar
            </button>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="section admin-page">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Painel ADM</p>
            <h1 className="section-title">Gerenciar produtos</h1>
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              sessionStorage.removeItem('jhl-admin-auth')
              setAutenticado(false)
            }}
          >
            Sair
          </button>
        </div>

        <div className="admin-grid">
          <form className="admin-form" onSubmit={salvar}>
            <div className="admin-sync">
              <label className="admin-field">
                <span>Senha de publicacao</span>
                <input
                  type="password"
                  value={adminSecret}
                  onChange={(event) => setAdminSecret(event.target.value)}
                  placeholder="ADMIN_SECRET configurado na Vercel"
                />
              </label>
              <button className="btn btn-outline btn-sm" type="button" onClick={sincronizar}>
                Recarregar catalogo
              </button>
            </div>

            {produtoEditando && (
              <div className="admin-editing">
                <span>Editando: {produtoEditando.nome}</span>
                <button className="btn btn-outline btn-sm" type="button" onClick={cancelarEdicao}>
                  Cancelar
                </button>
              </div>
            )}

            <div className="admin-form-row">
              <label className="admin-field">
                <span>Nome do produto</span>
                <input
                  value={form.nome}
                  onChange={(event) => atualizar('nome', event.target.value)}
                  placeholder="Ex: Rack Orlando"
                />
              </label>
              <label className="admin-field">
                <span>Preco</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.preco}
                  onChange={(event) => atualizar('preco', event.target.value)}
                  placeholder="1299.90"
                />
              </label>
            </div>

            <div className="admin-form-row">
              <label className="admin-field">
                <span>Categoria</span>
                <select
                  value={form.categoria_slug}
                  onChange={(event) => atualizar('categoria_slug', event.target.value)}
                >
                  {categorias.map((categoria) => (
                    <option key={categoria.slug} value={categoria.slug}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={form.destaque}
                  onChange={(event) => atualizar('destaque', event.target.checked)}
                />
                Mostrar nos destaques
              </label>
            </div>

            <label className="admin-field">
              <span>Descricao curta</span>
              <input
                value={form.descricao_curta}
                onChange={(event) => atualizar('descricao_curta', event.target.value)}
                placeholder="Resumo que aparece no card"
              />
            </label>

            <label className="admin-field">
              <span>Descricao completa</span>
              <textarea
                value={form.descricao}
                onChange={(event) => atualizar('descricao', event.target.value)}
                placeholder="Texto da pagina de detalhes"
                rows="4"
              />
            </label>

            <label className="admin-field">
              <span>Fotos da internet</span>
              <textarea
                value={form.imagens}
                onChange={(event) => atualizar('imagens', event.target.value)}
                placeholder="Cole uma URL de imagem por linha"
                rows="3"
              />
            </label>

            <div className="admin-form-row admin-form-row-specs">
              <label className="admin-field">
                <span>Dimensoes</span>
                <input
                  value={form.dimensoes}
                  onChange={(event) => atualizar('dimensoes', event.target.value)}
                  placeholder="180 x 45 x 60 cm"
                />
              </label>
              <label className="admin-field">
                <span>Material</span>
                <input
                  value={form.material}
                  onChange={(event) => atualizar('material', event.target.value)}
                  placeholder="MDF, madeira, tecido..."
                />
              </label>
              <label className="admin-field">
                <span>Cor</span>
                <input
                  value={form.cor}
                  onChange={(event) => atualizar('cor', event.target.value)}
                  placeholder="Freijo / off-white"
                />
              </label>
              <label className="admin-field">
                <span>Peso</span>
                <input
                  value={form.peso}
                  onChange={(event) => atualizar('peso', event.target.value)}
                  placeholder="35 kg"
                />
              </label>
              <label className="admin-field">
                <span>Garantia</span>
                <input
                  value={form.garantia}
                  onChange={(event) => atualizar('garantia', event.target.value)}
                  placeholder="12 meses"
                />
              </label>
            </div>

            {erro && <p className="admin-error">{erro}</p>}
            {sucesso && <p className="admin-success">{sucesso}</p>}
            <button className="btn btn-accent" type="submit" disabled={salvando}>
              {salvando ? 'Publicando...' : produtoEditando ? 'Salvar alteracoes' : 'Criar produto'}
            </button>
          </form>

          <aside className="admin-list">
            <h2>Catalogo publicado</h2>
            {produtosAdmin.length === 0 || produtosAdmin.every((p) => !p.id) ? (
              <p className="admin-empty">Clique em recarregar catalogo para ver os produtos.</p>
            ) : (
              produtosAdmin.map((produto) => (
                <div key={produto.id} className="admin-product">
                  <img src={produto.imagens[0]} alt="" />
                  <div>
                    <p className="admin-product-name">{produto.nome}</p>
                    <p className="admin-product-price">
                      {Number(produto.preco).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                    <div className="admin-product-actions">
                      <button type="button" onClick={() => editar(produto)} disabled={salvando}>
                        Editar
                      </button>
                      <button type="button" onClick={() => remover(produto)} disabled={salvando}>
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
