import { Calendar, FileText, DollarSign, Clock } from 'lucide-react';
import { audiencias, diligencias, faturamento } from '../data/mockData';

const Dashboard = () => {
  // Calcular estatísticas
  const audienciasHoje = audiencias.filter(a => {
    const hoje = new Date().toISOString().split('T')[0];
    return a.data === hoje;
  }).length;

  const audienciasAgendadas = audiencias.filter(a => a.status === 'Agendada').length;
  const diligenciasAndamento = diligencias.filter(d => d.status === 'Em Andamento').length;
  const faturamentoPendente = faturamento.filter(f => f.status === 'Pendente').length;

  const proximasAudiencias = audiencias
    .filter(a => new Date(a.data) >= new Date())
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .slice(0, 5);

  const diligenciasRecentes = diligencias
    .filter(d => d.status === 'Em Andamento')
    .slice(0, 5);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Audiências Hoje"
          value={audienciasHoje}
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Audiências Agendadas"
          value={audienciasAgendadas}
          icon={Clock}
          color="bg-green-500"
        />
        <StatCard
          title="Diligências em Andamento"
          value={diligenciasAndamento}
          icon={FileText}
          color="bg-yellow-500"
        />
        <StatCard
          title="Faturamento Pendente"
          value={faturamentoPendente}
          icon={DollarSign}
          color="bg-red-500"
        />
      </div>

      {/* Seções de resumo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Audiências */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Próximas Audiências</h3>
          </div>
          <div className="p-6">
            {proximasAudiencias.length > 0 ? (
              <div className="space-y-4">
                {proximasAudiencias.map((audiencia) => (
                  <div key={audiencia.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{audiencia.cliente}</p>
                      <p className="text-sm text-gray-600">{audiencia.parteAdverso}</p>
                      <p className="text-sm text-gray-500">{audiencia.comarca} - {audiencia.uf}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{audiencia.data}</p>
                      <p className="text-sm text-gray-600">{audiencia.hora}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhuma audiência agendada</p>
            )}
          </div>
        </div>

        {/* Diligências em Andamento */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Diligências em Andamento</h3>
          </div>
          <div className="p-6">
            {diligenciasRecentes.length > 0 ? (
              <div className="space-y-4">
                {diligenciasRecentes.map((diligencia) => (
                  <div key={diligencia.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{diligencia.solicitacao}</p>
                      <p className="text-sm text-gray-600">{diligencia.parteAdverso}</p>
                      <p className="text-sm text-gray-500">{diligencia.comarca} - {diligencia.uf}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{diligencia.prazo}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {diligencia.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhuma diligência em andamento</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
