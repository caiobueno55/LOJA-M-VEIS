// Estrutura pensada para espelhar uma tabela "produtos" no banco (ex: Neon/Postgres).
// Quando integrar com o banco, troque este array por um fetch a uma API que
// retorne objetos no mesmo formato.

function img(id, w = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`
}

const fotos = {
  sofaBege: img('photo-1555041469-a586c61ea9bc'),
  sofaSala: img('photo-1618221195710-dd6b41faaea6'),
  sofaCanto: img('photo-1605774337664-7a846e9cdf17'),
  mesaJantar: img('photo-1615066390971-03e4e1c36ddf'),
  mesaCentro: img('photo-1533090481720-856c6e3c1fdc'),
  cadeiraMadeira: img('photo-1503602642458-232111445657'),
  cadeiraEstofada: img('photo-1567538096630-e0c55bd6374c'),
  estanteModular: img('photo-1524758631624-e2822e304c36'),
  estanteLivros: img('photo-1521587760476-6c12a4b040da'),
  camaCasal: img('photo-1505693416388-ac5ce068fe85'),
  comodaVintage: img('photo-1595428774223-ef52624120d2'),
  espelhoSol: img('photo-1618220179428-22790b461013'),
  luminariaPiso: img('photo-1540932239986-30128078f3c5'),
  detalheMadeira: img('photo-1513519245088-0e12902e5a38'),
}

const STORAGE_KEY = 'jhl-produtos-admin'

function criarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const produtosBase = [
  {
    id: 1,
    slug: 'sofa-retratil-linhares',
    nome: 'Sofá Retrátil Linhares',
    categoria_slug: 'sofas',
    preco: 3299.9,
    destaque: true,
    descricao_curta: 'Três lugares, retrátil e reclinável, em linho bege.',
    descricao: 'Sofá de três lugares com módulo retrátil e reclinável, estofado em linho bege encorpado. Estrutura em madeira de eucalipto reflorestado e espuma D33 de alta resiliência para conforto duradouro.',
    especificacoes: {
      Dimensões: '210 x 95 x 90 cm (L x P x A)',
      Material: 'Linho e madeira de eucalipto',
      Cor: 'Bege',
      Peso: '58 kg',
      Garantia: '12 meses',
    },
    imagens: [fotos.sofaBege, fotos.sofaSala, fotos.detalheMadeira],
  },
  {
    id: 2,
    slug: 'sofa-canto-marau',
    nome: 'Sofá de Canto Marau',
    categoria_slug: 'sofas',
    preco: 4599.0,
    destaque: true,
    descricao_curta: 'Módulo de canto amplo em veludo marrom.',
    descricao: 'Sofá de canto com chaise, revestido em veludo marrom terroso. Pés palito em madeira maciça e almofadas soltas para ajuste de conforto.',
    especificacoes: {
      Dimensões: '280 x 170 x 88 cm (L x P x A)',
      Material: 'Veludo e madeira maciça',
      Cor: 'Marrom',
      Peso: '72 kg',
      Garantia: '12 meses',
    },
    imagens: [fotos.sofaCanto, fotos.sofaSala],
  },
  {
    id: 3,
    slug: 'mesa-jantar-itaipava',
    nome: 'Mesa de Jantar Itaipava',
    categoria_slug: 'mesas',
    preco: 2199.0,
    destaque: true,
    descricao_curta: 'Tampo de madeira maciça para 6 lugares.',
    descricao: 'Mesa de jantar com tampo em madeira de demolição maciça e base em ferro preto. Acomoda até 6 pessoas confortavelmente. Cada peça tem veio único, então pequenas variações fazem parte da identidade da madeira.',
    especificacoes: {
      Dimensões: '180 x 90 x 75 cm (L x P x A)',
      Material: 'Madeira de demolição e ferro',
      Cor: 'Madeira natural',
      Peso: '45 kg',
      Garantia: '24 meses',
    },
    imagens: [fotos.mesaJantar, fotos.detalheMadeira],
  },
  {
    id: 4,
    slug: 'mesa-centro-bento',
    nome: 'Mesa de Centro Bento',
    categoria_slug: 'mesas',
    preco: 899.0,
    destaque: false,
    descricao_curta: 'Redonda, com tampo em madeira e base em metal.',
    descricao: 'Mesa de centro redonda com tampo em madeira clara e base tripé em metal preto fosco. Compacta e versátil para salas pequenas ou grandes.',
    especificacoes: {
      Dimensões: '80 x 80 x 40 cm (D x A)',
      Material: 'Madeira e metal',
      Cor: 'Madeira clara / preto',
      Peso: '14 kg',
      Garantia: '12 meses',
    },
    imagens: [fotos.mesaCentro, fotos.sofaSala],
  },
  {
    id: 5,
    slug: 'cadeira-windsor-taquari',
    nome: 'Cadeira Windsor Taquari',
    categoria_slug: 'cadeiras',
    preco: 549.0,
    destaque: true,
    descricao_curta: 'Design clássico em madeira maciça torneada.',
    descricao: 'Releitura da clássica cadeira Windsor, com encosto em ripas torneadas e assento anatômico. Feita em madeira maciça com acabamento em verniz fosco.',
    especificacoes: {
      Dimensões: '52 x 55 x 88 cm (L x P x A)',
      Material: 'Madeira maciça',
      Cor: 'Marrom escuro',
      Peso: '6 kg',
      Garantia: '12 meses',
    },
    imagens: [fotos.cadeiraMadeira, fotos.detalheMadeira],
  },
  {
    id: 6,
    slug: 'cadeira-estofada-lages',
    nome: 'Cadeira Estofada Lages',
    categoria_slug: 'cadeiras',
    preco: 649.0,
    destaque: false,
    descricao_curta: 'Estofada em couro sintético caramelo.',
    descricao: 'Cadeira estofada com encosto alto, revestida em couro sintético caramelo. Pés em madeira maciça no formato palito.',
    especificacoes: {
      Dimensões: '55 x 58 x 92 cm (L x P x A)',
      Material: 'Couro sintético e madeira',
      Cor: 'Caramelo',
      Peso: '8 kg',
      Garantia: '12 meses',
    },
    imagens: [fotos.cadeiraEstofada, fotos.mesaJantar],
  },
  {
    id: 7,
    slug: 'estante-modular-serrinha',
    nome: 'Estante Modular Serrinha',
    categoria_slug: 'estantes',
    preco: 1899.0,
    destaque: true,
    descricao_curta: 'Módulos combináveis em madeira e metal.',
    descricao: 'Sistema de estantes modulares que pode ser configurado em diferentes formatos. Prateleiras em MDF revestido com estrutura em metal preto.',
    especificacoes: {
      Dimensões: '160 x 30 x 180 cm (L x P x A)',
      Material: 'MDF e metal',
      Cor: 'Madeira / preto',
      Peso: '38 kg',
      Garantia: '12 meses',
    },
    imagens: [fotos.estanteModular, fotos.estanteLivros],
  },
  {
    id: 8,
    slug: 'estante-livros-canela',
    nome: 'Estante de Livros Canela',
    categoria_slug: 'estantes',
    preco: 1299.0,
    destaque: false,
    descricao_curta: 'Cinco prateleiras em madeira maciça.',
    descricao: 'Estante alta com cinco prateleiras espaçosas, ideal para livros e objetos decorativos. Estrutura inteira em madeira maciça com acabamento natural.',
    especificacoes: {
      Dimensões: '90 x 30 x 190 cm (L x P x A)',
      Material: 'Madeira maciça',
      Cor: 'Madeira natural',
      Peso: '32 kg',
      Garantia: '12 meses',
    },
    imagens: [fotos.estanteLivros, fotos.estanteModular],
  },
  {
    id: 9,
    slug: 'cama-casal-ipe',
    nome: 'Cama Casal Ipê',
    categoria_slug: 'quarto',
    preco: 2499.0,
    destaque: true,
    descricao_curta: 'Cabeceira estofada em linho bege.',
    descricao: 'Cama de casal com cabeceira estofada em linho bege e capitonê discreto. Estrado em madeira maciça com ripas flexíveis para maior conforto.',
    especificacoes: {
      Dimensões: '158 x 203 x 120 cm (L x P x A)',
      Material: 'Linho e madeira maciça',
      Cor: 'Bege',
      Peso: '65 kg',
      Garantia: '12 meses',
    },
    imagens: [fotos.camaCasal, fotos.detalheMadeira],
  },
  {
    id: 10,
    slug: 'comoda-vintage-guarapari',
    nome: 'Cômoda Vintage Guarapari',
    categoria_slug: 'quarto',
    preco: 1599.0,
    destaque: false,
    descricao_curta: 'Quatro gavetas com puxadores em latão.',
    descricao: 'Cômoda com quatro gavetas amplas, acabamento em laca marrom fosco e puxadores em latão envelhecido. Inspirada no design vintage brasileiro dos anos 60.',
    especificacoes: {
      Dimensões: '110 x 45 x 80 cm (L x P x A)',
      Material: 'MDF laqueado e latão',
      Cor: 'Marrom',
      Peso: '40 kg',
      Garantia: '12 meses',
    },
    imagens: [fotos.comodaVintage, fotos.detalheMadeira],
  },
  {
    id: 11,
    slug: 'espelho-sol-marica',
    nome: 'Espelho Sol Maricá',
    categoria_slug: 'decoracao',
    preco: 449.0,
    destaque: false,
    descricao_curta: 'Moldura raiada em madeira, formato circular.',
    descricao: 'Espelho decorativo circular com moldura raiada em varetas de madeira maciça, remetendo a um sol. Peça de destaque para salas e corredores.',
    especificacoes: {
      Dimensões: '80 cm de diâmetro',
      Material: 'Madeira e vidro espelhado',
      Cor: 'Madeira natural',
      Peso: '4 kg',
      Garantia: '6 meses',
    },
    imagens: [fotos.espelhoSol, fotos.sofaSala],
  },
  {
    id: 12,
    slug: 'luminaria-piso-arraial',
    nome: 'Luminária de Piso Arraial',
    categoria_slug: 'decoracao',
    preco: 699.0,
    destaque: false,
    descricao_curta: 'Haste em madeira e cúpula em linho.',
    descricao: 'Luminária de piso com haste em madeira maciça e cúpula em tecido de linho cru. Luz difusa e aconchegante, ideal para cantos de leitura.',
    especificacoes: {
      Dimensões: '35 x 35 x 150 cm (L x P x A)',
      Material: 'Madeira e linho',
      Cor: 'Bege / madeira',
      Peso: '5 kg',
      Garantia: '6 meses',
    },
    imagens: [fotos.luminariaPiso, fotos.sofaSala],
  },
]

function getProdutosAdmin() {
  if (typeof localStorage === 'undefined') {
    return []
  }

  try {
    const salvos = localStorage.getItem(STORAGE_KEY)
    return salvos ? JSON.parse(salvos) : []
  } catch {
    return []
  }
}

export function getProdutos() {
  return [...getProdutosAdmin(), ...produtosBase]
}

export const produtos = getProdutos()

export function salvarProdutoAdmin(dados) {
  if (typeof localStorage === 'undefined') {
    return null
  }

  const atuais = getProdutosAdmin()
  const id = Date.now()
  const nome = dados.nome.trim()
  const slugBase = criarSlug(nome) || `produto-${id}`
  const produto = {
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
    imagens: dados.imagens
      .split('\n')
      .map((url) => url.trim())
      .filter(Boolean),
    criadoNoAdmin: true,
  }

  if (produto.imagens.length === 0) {
    produto.imagens = [fotos.sofaSala]
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify([produto, ...atuais]))
  return produto
}

export function removerProdutoAdmin(id) {
  if (typeof localStorage === 'undefined') {
    return
  }

  const atualizados = getProdutosAdmin().filter((produto) => produto.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados))
}

export function getProdutosCriadosAdmin() {
  return getProdutosAdmin()
}

export function getProdutoBySlug(slug) {
  return getProdutos().find((p) => p.slug === slug)
}

export function getProdutosByCategoria(categoriaSlug) {
  return getProdutos().filter((p) => p.categoria_slug === categoriaSlug)
}

export function getRelacionados(produto, limite = 4) {
  return getProdutos()
    .filter((p) => p.categoria_slug === produto.categoria_slug && p.id !== produto.id)
    .slice(0, limite)
}

export function getDestaques(limite = 6) {
  return getProdutos().filter((p) => p.destaque).slice(0, limite)
}
