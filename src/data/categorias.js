// Estrutura pensada para espelhar uma tabela "categorias" no banco (ex: Neon/Postgres).
// id -> slug -> nome -> descricao_curta -> icone (chave usada pelo componente CategoryIcon)
export const categorias = [
  {
    id: 1,
    slug: 'sofas',
    nome: 'Sofás',
    descricao_curta: 'Conforto para o dia a dia',
    icone: 'sofa',
  },
  {
    id: 2,
    slug: 'mesas',
    nome: 'Mesas',
    descricao_curta: 'Para reunir e trabalhar',
    icone: 'mesa',
  },
  {
    id: 3,
    slug: 'cadeiras',
    nome: 'Cadeiras',
    descricao_curta: 'Estilo em cada detalhe',
    icone: 'cadeira',
  },
  {
    id: 4,
    slug: 'estantes',
    nome: 'Estantes',
    descricao_curta: 'Organização com personalidade',
    icone: 'estante',
  },
  {
    id: 5,
    slug: 'quarto',
    nome: 'Quarto',
    descricao_curta: 'Camas, criados e cômodas',
    icone: 'quarto',
  },
  {
    id: 6,
    slug: 'decoracao',
    nome: 'Decoração',
    descricao_curta: 'Os toques finais',
    icone: 'decoracao',
  },
]

export function getCategoriaBySlug(slug) {
  return categorias.find((c) => c.slug === slug)
}
