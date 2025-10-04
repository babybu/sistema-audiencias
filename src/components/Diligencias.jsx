import { useState } from 'react';
import { Search, Plus, Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { diligencias } from '../data/mockData';

const Diligencias = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDiligencia, setSelectedDiligencia] = useState(null);

  const filteredDiligencias = diligencias.filter(diligencia => {
    const matchesSearch = 
      diligencia.processo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diligencia.parteAdverso.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diligencia.solicitacao.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || diligencia.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Em Andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'Finalizada':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-red-100 text-red-800';
      case 'Cancelada':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const DiligenciaModal = ({ diligencia, onClose }) => {
    if (!diligencia) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Detalhes da Diligência</h3>
              <Button variant="ghost" onClick={onClose}>×</Button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prazo</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.prazo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hora</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.hora || 'Não informado'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Processo</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.processo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Solicitação</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.solicitacao}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(diligencia.status)}`}>
                  {diligencia.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Parte Adverso</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.parteAdverso}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Parte Contrária</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.parteContraria}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Órgão</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.orgao}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Local</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.local || 'Não informado'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comarca</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.comarca}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">UF</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.uf}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valor</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(diligencia.valor)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valor MC</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(diligencia.valorMc)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cliente</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.cliente || 'Não informado'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Solicitante</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.solicitante || 'Não informado'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Resumo do Pedido</label>
                <p className="mt-1 text-sm text-gray-900">{diligencia.resumoPedido}</p>
              </div>
              {diligencia.observacao && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Observação</label>
                  <p className="mt-1 text-sm text-gray-900">{diligencia.observacao}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header com controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os Status</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Pendente">Pendente</option>
            <option value="Finalizada">Finalizada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar diligências..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Diligência
          </Button>
        </div>
      </div>

      {/* Lista de diligências */}
      <div className="bg-white rounded-lg shadow">
        {filteredDiligencias.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredDiligencias.map((diligencia) => (
              <div key={diligencia.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(diligencia.status)}`}>
                        {diligencia.status}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900">{diligencia.solicitacao}</h3>
                    </div>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Processo:</span> {diligencia.processo}
                      </div>
                      <div>
                        <span className="font-medium">Parte Adverso:</span> {diligencia.parteAdverso}
                      </div>
                      <div>
                        <span className="font-medium">Comarca:</span> {diligencia.comarca} - {diligencia.uf}
                      </div>
                      <div>
                        <span className="font-medium">Prazo:</span> {diligencia.prazo}
                      </div>
                      <div>
                        <span className="font-medium">Órgão:</span> {diligencia.orgao}
                      </div>
                      <div>
                        <span className="font-medium">Valor MC:</span> {formatCurrency(diligencia.valorMc)}
                      </div>
                    </div>
                    {diligencia.resumoPedido && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-700 line-clamp-2">{diligencia.resumoPedido}</p>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDiligencia(diligencia)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma diligência encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar os filtros ou termos de busca.
            </p>
          </div>
        )}
      </div>

      {/* Modal de detalhes */}
      <DiligenciaModal
        diligencia={selectedDiligencia}
        onClose={() => setSelectedDiligencia(null)}
      />
    </div>
  );
};

export default Diligencias;
