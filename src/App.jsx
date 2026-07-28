import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Produtos from './pages/Produtos.jsx'
import ProdutoDetalhe from './pages/ProdutoDetalhe.jsx'
import Sobre from './pages/Sobre.jsx'
import Contato from './pages/Contato.jsx'
import Admin from './pages/Admin.jsx'
import NaoEncontrado from './pages/NaoEncontrado.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhe />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
