import { useState } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './features/home/HomePage'
import FinancePage from './features/finance/FinancePage'
import DataPage from './features/data/DataPage'
import ContactPage from './features/contact/ContactPage'
import SoftwarePage from './features/software/SoftwarePage'
import BlogPage from './features/blog/BlogPage'
import SoftwareProjectDetailPage from "./pages/Software/SoftwareProjectDetailPage"
import DataProjectDetailPage from "./pages/Data/DataProjectDetailPage";
import FinanceProjectDetailPage from './pages/Finance/FinanceProjectDetailPage'
import BlogDetailPage from './pages/General/BlogDetailPage'
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/software" element={<SoftwarePage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/Blog" element={<BlogPage />} />

        <Route path="/software/projects/:slug" element={<SoftwareProjectDetailPage />} />
        <Route path="/data/projects/:slug" element={<DataProjectDetailPage />} />
        <Route path="/finance/projects/:slug" element={<FinanceProjectDetailPage />} />
        <Route path="/blog/analysis/:slug" element={<BlogDetailPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App