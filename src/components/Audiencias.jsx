import { useState } from 'react';
import { Calendar, List, Search, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { audiencias } from '../data/mockData';

const Audiencias = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' ou 'calendar'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudiencia, setSelectedAudiencia] = useState(null);

  const filteredAudiencias = audiencias.filter(audiencia =>
    audiencia.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audiencia.parteAdverso.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audiencia.processo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Agendada':
        return 'bg-blue-100 text-blue-800';
      case 'Realizada':
        return 'bg-green-100 text-green-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
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

  const AudienciaModal = ({ audiencia, onClose }) => {
    if (!audiencia) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Detalhes da Audiência</h3>
              <Button variant="ghost" onClick={onClose}>×</Button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Data</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.data}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hora</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.hora}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Processo</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.processo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cliente</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.cliente}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Parte Adverso</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.parteAdverso}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Órgão</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.orgao}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Local</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.local || 'Não informado'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comarca</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.comarca}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">UF</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.uf}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Solicitação</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.solicitacao}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.tipo || 'Não informado'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valor</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(audiencia.valor)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valor MC</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(audiencia.valorMc)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cliente Nome</label>
                <p className="mt-1 text-sm text-gray-900">{audiencia.clienteNome}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(audiencia.status)}`}>
                  {audiencia.status}
                </span>
              </div>
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
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-2" />
            Lista
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendário
          </Button>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar audiências..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Audiência
          </Button>
        </div>
      </div>

      {/* Conteúdo principal */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data/Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parte Adverso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comarca
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAudiencias.map((audiencia) => (
                  <tr key={audiencia.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{audiencia.data}</div>
                        <div className="text-gray-500">{audiencia.hora}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {audiencia.processo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {audiencia.cliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {audiencia.parteAdverso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {audiencia.comarca} - {audiencia.uf}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(audiencia.status)}`}>
                        {audiencia.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAudiencia(audiencia)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Visualização em Calendário</h3>
            <p className="mt-1 text-sm text-gray-500">
              A visualização em calendário será implementada em breve.
            </p>
          </div>
        </div>
      )}

      {/* Modal de detalhes */}
      <AudienciaModal
        audiencia={selectedAudiencia}
        onClose={() => setSelectedAudiencia(null)}
      />
    </div>
  );
};

export default Audiencias;
