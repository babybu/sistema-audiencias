import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Audiencias from './components/Audiencias';
import Diligencias from './components/Diligencias';
import Faturamento from './components/Faturamento';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'audiencias':
        return <Audiencias />;
      case 'diligencias':
        return <Diligencias />;
      case 'faturamento':
        return <Faturamento />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      {/* Barra de ambiente DEV */}
      <div className="w-full bg-emerald-600 text-white text-sm px-3 py-2 flex items-center justify-between">
        <span>Sistema de Audiências — Ambiente de Desenvolvimento</span>
        <span className="opacity-80">build local</span>
      </div>

      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
    </>
  );
}

export default App;
