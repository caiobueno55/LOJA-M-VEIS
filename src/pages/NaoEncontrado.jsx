import { Link } from 'react-router-dom'

export default function NaoEncontrado() {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container">
        <p className="eyebrow">Erro 404</p>
        <h1 className="section-title" style={{ marginBottom: 16 }}>
          Essa página não existe
        </h1>
        <p className="section-sub" style={{ margin: '0 auto 28px' }}>
          O endereço que você tentou acessar não foi encontrado.
        </p>
        <Link to="/" className="btn btn-primary">
          Voltar ao início
        </Link>
      </div>
    </section>
  )
}
