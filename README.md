# Loja de Móveis — Site de exposição

Site institucional (sem carrinho/pedido online) construído em **React + Vite + React Router**.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (geralmente `http://localhost:5173`).

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos finais ficam em `dist/` — pode subir em qualquer hospedagem estática
(Vercel, Netlify, Cloudflare Pages, etc.).

## Estrutura

```
src/
  components/   Header, Footer, cards, botão de WhatsApp, ícones
  pages/        Home, Produtos, ProdutoDetalhe, Sobre, Contato
  data/         produtos.js, categorias.js, loja.js  <- dados mockados
  styles/       global.css (paleta, tipografia, tokens)
```

## Trocar os dados fictícios pelos reais

Tudo está centralizado em `src/data/`:

- **`loja.js`** — nome da loja, WhatsApp, endereço, e-mail, horário, link do mapa.
  Troque `whatsapp` pelo número real (código do país + DDD + número, só dígitos).
- **`produtos.js`** — array de produtos. Cada item tem o mesmo formato que uma linha
  de tabela de banco (`id`, `nome`, `categoria_slug`, `preco`, `imagens`, etc). As
  imagens hoje vêm de `picsum.photos` (placeholders) — troque pelas fotos reais.
- **`categorias.js`** — as categorias usadas nos filtros e menus.

## Caminho para integrar com banco (Neon/Postgres)

O site já está desenhado para isso: as funções `getDestaques`, `getProdutosByCategoria`,
`getProdutoBySlug` etc. em `produtos.js` só leem o array local. Pra plugar num banco:

1. Criar uma API (ex: rotas serverless na Vercel, ou um pequeno servidor Express) que
   consulte o Neon e devolva os produtos no mesmo formato JSON usado aqui.
2. Trocar essas funções por `fetch` para essa API (idealmente com `useEffect`/`useState`
   ou uma lib como React Query).
3. O resto do site (componentes, rotas, layout) não precisa mudar.

Isso é trabalho de backend/deploy que não dá pra rodar dentro deste chat — recomendo
fazer essa parte no **Claude Code** (terminal, VS Code ou app desktop), onde dá pra
configurar variáveis de ambiente, testar a conexão com o Neon e fazer o deploy.
