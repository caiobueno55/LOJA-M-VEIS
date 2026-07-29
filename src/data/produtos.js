import produtosJson from './produtos.json'

function criarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const produtosBase = produtosJson
export const produtos = produtosJson

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

export async function carregarProdutos() {
  try {
    const resposta = await fetch('/api/produtos', {
      headers: { Accept: 'application/json' },
    })

    if (!resposta.ok) {
      throw new Error('Não foi possível carregar os produtos.')
    }

    return resposta.json()
  } catch {
    return produtosJson
  }
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

  const dados = await resposta.json().catch(() => ({}))

  if (!resposta.ok) {
    throw new Error(dados.error || 'Não foi possível salvar o produto.')
  }

  return dados
}

export function getProdutos() {
  return produtosJson
}

export function getProdutoBySlug(slug) {
  return produtosJson.find((p) => p.slug === slug)
}

export function getProdutosByCategoria(categoriaSlug) {
  return produtosJson.filter((p) => p.categoria_slug === categoriaSlug)
}

export function getRelacionados(produto, limite = 4) {
  return produtosJson
    .filter((p) => p.categoria_slug === produto.categoria_slug && p.id !== produto.id)
    .slice(0, limite)
}

export function getDestaques(limite = 6) {
  return produtosJson.filter((p) => p.destaque).slice(0, limite)
}
