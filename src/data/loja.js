// Troque estes dados pelos reais da loja.
export const loja = {
  nome: 'JHL Móveis',
  slogan: 'Móveis direto da fábrica, com entrega e montagem',
  whatsapp: '5541996768037', // formato: código do país + DDD + número, sem espaços ou símbolos
  telefoneExibicao: '(41) 99676-8037',
  email: 'contato@jhlmoveis.com.br',
  endereco: {
    linha1: 'Rua das Araucárias, 1200',
    linha2: 'Bairro Batel, Curitiba - PR',
    cep: '80420-000',
  },
  horario: 'Seg a Sex, 9h às 18h · Sáb, 9h às 13h',
  instagram: '@jhlmoveis',
  mapaEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.0!2d-49.2833!3d-25.4372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI2JzE0LjAiUyA0OcKwMTYnNTkuOSJX!5e0!3m2!1spt-BR!2sbr',
}

export function linkWhatsApp(mensagem) {
  const texto = encodeURIComponent(mensagem)
  return `https://wa.me/${loja.whatsapp}?text=${texto}`
}
