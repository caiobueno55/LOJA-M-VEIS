import { useState } from 'react'
import { loja, linkWhatsApp } from '../data/loja.js'
import './contato.css'

export default function Contato() {
  const [form, setForm] = useState({ nome: '', telefone: '', mensagem: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const texto = `Olá, meu nome é ${form.nome || '(não informado)'}.\nTelefone: ${
      form.telefone || '(não informado)'
    }\nMensagem: ${form.mensagem || '(sem mensagem)'}`
    window.open(linkWhatsApp(texto), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="section contato-page">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Fale com a gente</p>
            <h1 className="section-title">Contato</h1>
          </div>
          <p className="section-sub">
            Prefere WhatsApp? É só clicar no botão flutuante ou preencher o formulário
            que a gente te chama por lá.
          </p>
        </div>

        <div className="contato-grid">
          <form className="contato-form" onSubmit={handleSubmit}>
            <label className="campo">
              <span>Nome</span>
              <input
                type="text"
                name="nome"
                required
                value={form.nome}
                onChange={handleChange}
                placeholder="Seu nome"
              />
            </label>

            <label className="campo">
              <span>Telefone</span>
              <input
                type="tel"
                name="telefone"
                required
                value={form.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </label>

            <label className="campo">
              <span>Mensagem</span>
              <textarea
                name="mensagem"
                rows="5"
                required
                value={form.mensagem}
                onChange={handleChange}
                placeholder="Conte pra gente o que você procura"
              />
            </label>

            <button type="submit" className="btn btn-accent">
              Enviar pelo WhatsApp
            </button>
            <p className="campo-nota">
              Ao enviar, você será direcionado ao WhatsApp com a mensagem já preenchida.
            </p>
          </form>

          <div className="contato-info">
            <div className="info-card">
              <p className="info-heading">Endereço</p>
              <p>{loja.endereco.linha1}</p>
              <p>{loja.endereco.linha2}</p>
              <p>CEP {loja.endereco.cep}</p>
            </div>
            <div className="info-card">
              <p className="info-heading">Horário</p>
              <p>{loja.horario}</p>
            </div>
            <div className="info-card">
              <p className="info-heading">Contato direto</p>
              <p>{loja.telefoneExibicao}</p>
              <p>{loja.email}</p>
              <p>{loja.instagram}</p>
            </div>

            <div className="mapa-wrapper">
              <iframe
                title="Mapa da loja"
                src={loja.mapaEmbedUrl}
                width="100%"
                height="240"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
