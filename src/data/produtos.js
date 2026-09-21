import produtosJson from './produtos.json'

function criarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function criarProduto(dados) {
  const id = Date.now()
  const nome = dados.nome.trim()
  const slugBase = criarSlug(nome) || `produto-${id}`
  const imagens = dados.imagens
    .split('\n')
    .map((url) => url.trim())
    .filter(Boolean)

  return {
    id,
    slug: `${slugBase}-${id}`,
    nome,
    categoria_slug: dados.categoria_slug,
    preco: Number(dados.preco),
    destaque: Boolean(dados.destaque),
    descricao_curta: dados.descricao_curta.trim(),
    descricao: dados.descricao.trim(),
    especificacoes: {
      Dimensões: dados.dimensoes.trim() || 'Sob consulta',
      Material: dados.material.trim() || 'Sob consulta',
      Cor: dados.cor.trim() || 'Sob consulta',
      Peso: dados.peso.trim() || 'Sob consulta',
      Garantia: dados.garantia.trim() || 'Sob consulta',
    },
    imagens:
      imagens.length > 0
        ? imagens
        : [
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=82',
          ],
  }
}

async function lerRespostaJson(resposta, mensagemPadrao) {
  const texto = await resposta.text()
  let dados = {}

  if (texto) {
    try {
      dados = JSON.parse(texto)
    } catch {
      throw new Error('A API de produtos nao retornou JSON. Rode com a API da Vercel ativa ou publique para testar.')
    }
  }

  if (!resposta.ok) {
    throw new Error(dados.error || mensagemPadrao)
  }

  return dados
}

export async function carregarProdutos() {
  const resposta = await fetch('/api/produtos', {
    headers: { Accept: 'application/json' },
  })

  return lerRespostaJson(resposta, 'Nao foi possivel carregar os produtos.')
}

export async function salvarProduto(produto, adminSecret) {
  const resposta = await fetch('/api/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-secret': adminSecret,
    },
    body: JSON.stringify(produto),
  })

  return lerRespostaJson(resposta, 'Nao foi possivel salvar o produto.')
}

export async function atualizarProduto(produto, adminSecret) {
  const resposta = await fetch('/api/produtos', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-secret': adminSecret,
    },
    body: JSON.stringify(produto),
  })

  return lerRespostaJson(resposta, 'Nao foi possivel atualizar o produto.')
}

export async function excluirProduto(id, adminSecret) {
  const resposta = await fetch(`/api/produtos?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      'x-admin-secret': adminSecret,
    },
  })

  return lerRespostaJson(resposta, 'Nao foi possivel excluir o produto.')
}

export function getProdutos() {
  // No cliente, sempre começamos com os dados do build.
  // A página de admin buscará a versão mais recente da API.
  return produtosJson
}

export function getRelacionados(produto, limite = 4) {
  return getProdutos()
    .filter((p) => p.categoria_slug === produto.categoria_slug && p.id !== produto.id)
    .slice(0, limite)
}

export function getDestaques(limite = 6) {
  return getProdutos().filter((p) => p.destaque).slice(0, limite)
}

export function getProdutoBySlug(slug) {
  return getProdutos().find((p) => p.slug === slug)
}

export function getProdutosByCategoria(categoriaSlug) {
  const produtos = getProdutos()
  if (!categoriaSlug || categoriaSlug === 'todos') {
    return produtos
  }
  return produtos.filter((p) => p.categoria_slug === categoriaSlug)
}
