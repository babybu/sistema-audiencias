import { useState } from 'react';
import { Calendar, Grid3X3, Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { realAudiencias as audiencias } from '../data/realData';
import CalendarView from './CalendarView';
import AudienciaCard from './AudienciaCard';

const Audiencias = () => {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' ou 'calendar'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudiencia, setSelectedAudiencia] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAudiencias = audiencias.filter(audiencia => {
    const matchesSearch = 
      audiencia.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audiencia.parteAdverso.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audiencia.processo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audiencia.comarca.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || audiencia.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewAudiencia = (audiencia) => {
    setSelectedAudiencia(audiencia);
  };

  const handleEditAudiencia = (audiencia) => {
    console.log('Editar audiência:', audiencia);
    // TODO: Implementar modal de edição
  };

  const handleDeleteAudiencia = (audiencia) => {
    console.log('Excluir audiência:', audiencia);
    // TODO: Implementar confirmação de exclusão
  };

  const statusOptions = [
    { value: 'all', label: 'Todos os Status', count: audiencias.length },
    { value: 'Agendada', label: 'Agendadas', count: audiencias.filter(a => a.status === 'Agendada').length },
    { value: 'Realizada', label: 'Realizadas', count: audiencias.filter(a => a.status === 'Realizada').length },
    { value: 'Cancelada', label: 'Canceladas', count: audiencias.filter(a => a.status === 'Cancelada').length },
  ];

  // Modal de detalhes da audiência
  const AudienciaModal = ({ audiencia, onClose }) => {
    if (!audiencia) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Detalhes da Audiência</h3>
                <p className="text-sm text-gray-600 mt-1">Informações completas do processo</p>
              </div>
              <Button variant="ghost" onClick={onClose} className="hover:bg-white/50">
                ×
              </Button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Informações Básicas</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Data e Hora</label>
                      <p className="text-sm text-gray-900">{audiencia.data} às {audiencia.hora}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">
                        <Badge variant={audiencia.status === 'Agendada' ? 'default' : 'secondary'}>
                          {audiencia.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Partes Envolvidas</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Cliente</label>
                      <p className="text-sm text-gray-900">{audiencia.cliente}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Parte Adversa</label>
                      <p className="text-sm text-gray-900">{audiencia.parteAdverso}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Processo</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Número</label>
                      <p className="text-sm text-gray-900 font-mono">{audiencia.processo}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Órgão</label>
                      <p className="text-sm text-gray-900">{audiencia.orgao}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Localização</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Comarca</label>
                      <p className="text-sm text-gray-900">{audiencia.comarca} - {audiencia.uf}</p>
                    </div>
                    {audiencia.local && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Local</label>
                        <p className="text-sm text-gray-900">{audiencia.local}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4 border-t">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Editar Audiência
              </Button>
              <Button variant="outline" className="flex-1">
                Remarcar
              </Button>
              <Button variant="destructive" className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header com controles */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className="flex items-center gap-2"
          >
            <Grid3X3 className="h-4 w-4" />
            Cards
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Calendário
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar audiências..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-80"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nova Audiência
          </Button>
        </div>
      </div>

      {/* Filtros de status */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={filterStatus === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus(option.value)}
            className="flex items-center gap-2"
          >
            <Filter className="h-3 w-3" />
            {option.label}
            <Badge variant="secondary" className="ml-1 text-xs">
              {option.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Conteúdo principal */}
      {viewMode === 'cards' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando {filteredAudiencias.length} de {audiencias.length} audiências
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAudiencias.map((audiencia) => (
              <AudienciaCard
                key={audiencia.id}
                audiencia={audiencia}
                onView={handleViewAudiencia}
                onEdit={handleEditAudiencia}
                onDelete={handleDeleteAudiencia}
              />
            ))}
          </div>
          
          {filteredAudiencias.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma audiência encontrada</h3>
              <p className="mt-1 text-sm text-gray-500">
                Tente ajustar os filtros ou criar uma nova audiência.
              </p>
            </div>
          )}
        </div>
      ) : (
        <CalendarView 
          audiencias={filteredAudiencias} 
          onSelectAudiencia={handleViewAudiencia}
        />
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
