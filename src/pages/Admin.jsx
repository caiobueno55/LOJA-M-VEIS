import { useState } from 'react'
import { categorias } from '../data/categorias.js'
import {
  carregarProdutosAdminGitHub,
  GITHUB_BRANCH_PADRAO,
  getProdutosCriadosAdmin,
  publicarProdutosGitHub,
  removerProdutoAdmin,
  salvarProdutoAdmin,
} from '../data/produtos.js'
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

export default function Admin() {
  const [autenticado, setAutenticado] = useState(
    () => typeof sessionStorage !== 'undefined' && sessionStorage.getItem('jhl-admin-auth') === 'true',
  )
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [token, setToken] = useState(() => localStorage.getItem('jhl-github-token') || '')
  const [branch, setBranch] = useState(
    () => localStorage.getItem('jhl-github-branch') || GITHUB_BRANCH_PADRAO,
  )
  const [form, setForm] = useState(inicial)
  const [produtosAdmin, setProdutosAdmin] = useState(() => getProdutosCriadosAdmin())

  function entrar(event) {
    event.preventDefault()
    if (senha !== SENHA_ADMIN) {
      setErro('Senha incorreta. Para demonstração, use admin123.')
      return
    }
    sessionStorage.setItem('jhl-admin-auth', 'true')
    setAutenticado(true)
    setErro('')
  }

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  async function publicar(lista, mensagemSucesso) {
    setSalvando(true)
    setErro('')
    setSucesso('')
    try {
      localStorage.setItem('jhl-github-token', token)
      localStorage.setItem('jhl-github-branch', branch)
      await publicarProdutosGitHub(lista, token, branch)
      setProdutosAdmin(lista)
      setSucesso(mensagemSucesso)
    } catch (error) {
      setErro(error.message)
    } finally {
      setSalvando(false)
    }
  }

  async function cadastrar(event) {
    event.preventDefault()
    if (!form.nome.trim() || !form.preco || !form.descricao_curta.trim()) {
      setErro('Preencha nome, preço e descrição curta.')
      return
    }

    const produto = salvarProdutoAdmin(form)
    const novaLista = [produto, ...produtosAdmin]
    setForm(inicial)
    await publicar(novaLista, 'Produto publicado no GitHub.')
  }

  async function remover(id) {
    removerProdutoAdmin(id)
    const novaLista = produtosAdmin.filter((produto) => produto.id !== id)
    await publicar(novaLista, 'Produto removido e GitHub atualizado.')
  }

  async function sincronizar() {
    setSalvando(true)
    setErro('')
    setSucesso('')
    try {
      localStorage.setItem('jhl-github-token', token)
      localStorage.setItem('jhl-github-branch', branch)
      const lista = await carregarProdutosAdminGitHub(token, branch)
      setProdutosAdmin(lista)
      setSucesso('Produtos sincronizados do GitHub.')
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
            <h1 className="section-title">Cadastrar produtos</h1>
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
          <form className="admin-form" onSubmit={cadastrar}>
            <div className="admin-sync">
              <label className="admin-field">
                <span>Token do GitHub</span>
                <input
                  type="password"
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  placeholder="Cole aqui um token com permissão de conteúdo"
                />
              </label>
              <label className="admin-field">
                <span>Branch</span>
                <input
                  value={branch}
                  onChange={(event) => setBranch(event.target.value)}
                  placeholder={GITHUB_BRANCH_PADRAO}
                />
              </label>
              <button className="btn btn-outline btn-sm" type="button" onClick={sincronizar}>
                Sincronizar GitHub
              </button>
            </div>

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
                <span>Preço</span>
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
              <span>Descrição curta</span>
              <input
                value={form.descricao_curta}
                onChange={(event) => atualizar('descricao_curta', event.target.value)}
                placeholder="Resumo que aparece no card"
              />
            </label>

            <label className="admin-field">
              <span>Descrição completa</span>
              <textarea
                value={form.descricao}
                onChange={(event) => atualizar('descricao', event.target.value)}
                placeholder="Texto da página de detalhes"
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
                <span>Dimensões</span>
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
                  placeholder="Freijó / off-white"
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
              {salvando ? 'Publicando...' : 'Criar produto'}
            </button>
          </form>

          <aside className="admin-list">
            <h2>Produtos criados</h2>
            {produtosAdmin.length === 0 ? (
              <p className="admin-empty">Nenhum produto criado pelo ADM ainda.</p>
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
                    <button type="button" onClick={() => remover(produto.id)} disabled={salvando}>
                      Remover
                    </button>
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
