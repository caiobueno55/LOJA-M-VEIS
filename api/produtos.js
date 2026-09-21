const DEFAULT_OWNER = 'caiobueno55'
const DEFAULT_REPO = 'LOJA-M-VEIS'
const DEFAULT_BRANCH = 'feature/painel-admin-produtos'
const PRODUTOS_PATH = 'src/data/produtos.json'

function githubConfig() {
  return {
    owner: process.env.GITHUB_OWNER || DEFAULT_OWNER,
    repo: process.env.GITHUB_REPO || DEFAULT_REPO,
    branch: process.env.GITHUB_BRANCH || DEFAULT_BRANCH,
    token: process.env.GITHUB_TOKEN,
  }
}

function json(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(data))
}

function decodeBase64(content) {
  return Buffer.from(content.replace(/\n/g, ''), 'base64').toString('utf8')
}

function encodeBase64(content) {
  return Buffer.from(content, 'utf8').toString('base64')
}

async function getProdutosFile() {
  const { owner, repo, branch, token } = githubConfig()
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${PRODUTOS_PATH}?ref=${branch}`
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub GET failed with status ${response.status}`)
  }

  const file = await response.json()
  return {
    sha: file.sha,
    produtos: JSON.parse(decodeBase64(file.content) || '[]'),
  }
}

async function putProdutosFile(produtos, sha) {
  const { owner, repo, branch, token } = githubConfig()

  if (!token) {
    throw new Error('GITHUB_TOKEN nao configurado no servidor.')
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${PRODUTOS_PATH}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      message: 'chore: atualiza catalogo de produtos',
      content: encodeBase64(`${JSON.stringify(produtos, null, 2)}\n`),
      sha,
      branch,
    }),
  })

  if (!response.ok) {
    throw new Error(`GitHub PUT failed with status ${response.status}`)
  }

  return response.json()
}

function isAdmin(req) {
  const adminSecret = process.env.ADMIN_SECRET
  return Boolean(adminSecret && req.headers['x-admin-secret'] === adminSecret)
}

function validarProduto(produto) {
  if (!produto || typeof produto !== 'object') {
    return 'Produto invalido.'
  }

  if (!produto.nome || !produto.slug || !produto.categoria_slug) {
    return 'Nome, slug e categoria sao obrigatorios.'
  }

  if (!Number.isFinite(Number(produto.preco))) {
    return 'Preco invalido.'
  }

  if (!Array.isArray(produto.imagens) || produto.imagens.length === 0) {
    return 'Informe ao menos uma imagem.'
  }

  return ''
}

function getRequestBody(req) {
  if (!req.body) {
    return null
  }

  if (typeof req.body === 'string') {
    return JSON.parse(req.body)
  }

  return req.body
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { produtos } = await getProdutosFile()
      return json(res, 200, produtos)
    }

    if (req.method === 'POST') {
      if (!isAdmin(req)) {
        return json(res, 401, { error: 'Nao autorizado.' })
      }

      const produto = getRequestBody(req)
      const erro = validarProduto(produto)

      if (erro) {
        return json(res, 400, { error: erro })
      }

      const { sha, produtos } = await getProdutosFile()

      if (produtos.some((item) => item.slug === produto.slug)) {
        return json(res, 409, { error: 'Ja existe um produto com esse slug.' })
      }

      const atualizados = [produto, ...produtos]
      const commit = await putProdutosFile(atualizados, sha)
      return json(res, 201, { produto, commit: commit.commit?.sha, produtos: atualizados })
    }

    if (req.method === 'PUT') {
      if (!isAdmin(req)) {
        return json(res, 401, { error: 'Nao autorizado.' })
      }

      const produto = getRequestBody(req)
      const erro = validarProduto(produto)

      if (erro) {
        return json(res, 400, { error: erro })
      }

      if (!produto.id) {
        return json(res, 400, { error: 'ID do produto e obrigatorio.' })
      }

      const { sha, produtos } = await getProdutosFile()
      const index = produtos.findIndex((item) => String(item.id) === String(produto.id))

      if (index === -1) {
        return json(res, 404, { error: 'Produto nao encontrado.' })
      }

      if (produtos.some((item) => item.slug === produto.slug && String(item.id) !== String(produto.id))) {
        return json(res, 409, { error: 'Ja existe outro produto com esse slug.' })
      }

      const atualizados = [...produtos]
      atualizados[index] = produto
      const commit = await putProdutosFile(atualizados, sha)
      return json(res, 200, { produto, commit: commit.commit?.sha, produtos: atualizados })
    }

    if (req.method === 'DELETE') {
      if (!isAdmin(req)) {
        return json(res, 401, { error: 'Nao autorizado.' })
      }

      const id = req.query?.id

      if (!id) {
        return json(res, 400, { error: 'ID do produto e obrigatorio.' })
      }

      const { sha, produtos } = await getProdutosFile()
      const produto = produtos.find((item) => String(item.id) === String(id))

      if (!produto) {
        return json(res, 404, { error: 'Produto nao encontrado.' })
      }

      const atualizados = produtos.filter((item) => String(item.id) !== String(id))
      const commit = await putProdutosFile(atualizados, sha)
      return json(res, 200, { produto, commit: commit.commit?.sha, produtos: atualizados })
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE')
    return json(res, 405, { error: 'Metodo nao permitido.' })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Erro interno.' })
  }
}
