import { loja } from '../data/loja.js'
import GrainDivider from '../components/GrainDivider.jsx'
import './sobre.css'

const valores = [
  {
    titulo: 'Direto da fábrica',
    texto: 'Trabalhamos com linha própria e fornecedores selecionados para oferecer bom preço e variedade.',
  },
  {
    titulo: 'Entrega e montagem',
    texto: 'Ajudamos você desde a escolha do móvel até a entrega combinada e montagem no local.',
  },
  {
    titulo: 'Compra sem complicação',
    texto: 'Atendimento direto pelo WhatsApp, orientação de medidas e opções para cada ambiente da casa.',
  },
]

export default function Sobre() {
  return (
    <>
      <section className="section sobre-hero">
        <div className="container sobre-hero-grid">
          <div>
            <p className="eyebrow">Sobre a loja</p>
            <h1 className="section-title sobre-titulo">
              Móveis direto da fábrica para transformar sua casa
            </h1>
            <p className="sobre-texto">
              A {loja.nome} atende quem busca móveis bonitos, funcionais e com bom custo
              benefício. Nosso foco é facilitar a compra: você escolhe o produto, tira
              dúvidas pelo WhatsApp e recebe orientação para medidas, entrega e montagem.
            </p>
            <p className="sobre-texto">
              Temos opções para sala, quarto, jantar e decoração, com atendimento próximo e
              prático para deixar cada ambiente pronto sem complicação.
            </p>
          </div>
          <img
            className="sobre-img"
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=82"
            alt="Sala decorada com sofá e móveis"
          />
        </div>
      </section>

      <GrainDivider />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Como atendemos</p>
              <h2 className="section-title">Compra prática do começo ao fim</h2>
            </div>
          </div>

          <div className="valores-grid">
            {valores.map((v) => (
              <div key={v.titulo} className="valor-card">
                <p className="valor-titulo">{v.titulo}</p>
                <p className="valor-texto">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt sobre-info">
        <div className="container sobre-info-grid">
          <div>
            <p className="eyebrow">Onde estamos</p>
            <h2 className="section-title">Visite nosso showroom</h2>
            <p className="sobre-texto">
              {loja.endereco.linha1}, {loja.endereco.linha2}
            </p>
            <p className="sobre-texto">{loja.horario}</p>
          </div>
          <div>
            <p className="eyebrow">Fale com a gente</p>
            <h2 className="section-title">{loja.telefoneExibicao}</h2>
            <p className="sobre-texto">{loja.email}</p>
            <p className="sobre-texto">{loja.instagram}</p>
          </div>
        </div>
      </section>
    </>
  )
}
