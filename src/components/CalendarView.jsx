import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Clock, MapPin, User, FileText, Building } from 'lucide-react';

// Configurar moment para português
moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const CalendarView = ({ audiencias, onSelectAudiencia }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Função para formatar data brasileira
  const formatBrazilianDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para formatar data e hora brasileira
  const formatBrazilianDateTime = (dateString, timeString) => {
    const formattedDate = formatBrazilianDate(dateString);
    return `${formattedDate} ${timeString || '09:00'}`;
  };

  // Converter audiências para eventos do calendário
  const events = audiencias.map(audiencia => ({
    id: audiencia.id,
    title: audiencia.cliente,
    start: new Date(`${audiencia.data}T${audiencia.hora || '09:00'}`),
    end: new Date(`${audiencia.data}T${audiencia.hora ? 
      moment(audiencia.hora, 'HH:mm').add(1, 'hour').format('HH:mm') : '10:00'}`),
    resource: audiencia,
  }));

  // Componente de tooltip customizado
  const EventTooltip = ({ event }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs z-50">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-sm">{event.resource.cliente}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{event.resource.hora}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-600">{event.resource.processo}</span>
        </div>
        <Badge variant={event.resource.status === 'Agendada' ? 'default' : 'secondary'}>
          {event.resource.status}
        </Badge>
      </div>
    </div>
  );

  // Componente de evento customizado
  const EventComponent = ({ event }) => (
    <div className="h-full w-full p-1">
      <div className="text-xs font-medium truncate">{event.title}</div>
      <div className="text-xs text-gray-600 truncate">{event.resource.hora}</div>
    </div>
  );

  // Modal de detalhes
  const EventModal = ({ event, onClose }) => {
    if (!event) return null;
    
    const audiencia = event.resource;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Detalhes da Audiência</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Data e Hora</p>
                    <p className="text-sm text-gray-600">{formatBrazilianDateTime(audiencia.data, audiencia.hora)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Cliente</p>
                    <p className="text-sm text-gray-600">{audiencia.cliente}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Processo</p>
                    <p className="text-sm text-gray-600">{audiencia.processo}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="text-sm font-medium">Parte Adversa</p>
                    <p className="text-sm text-gray-600">{audiencia.parteAdverso}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Órgão</p>
                    <p className="text-sm text-gray-600">{audiencia.orgao}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium">Comarca</p>
                    <p className="text-sm text-gray-600">{audiencia.comarca} - {audiencia.uf}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {audiencia.local && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">Local</p>
                    <p className="text-sm text-gray-600">{audiencia.local}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Badge variant={audiencia.status === 'Agendada' ? 'default' : 'secondary'}>
                {audiencia.status}
              </Badge>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm">
                Editar
              </Button>
              <Button variant="outline" size="sm">
                Remarcar
              </Button>
              <Button variant="destructive" size="sm">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Configurações do calendário
  const calendarStyle = {
    height: 600,
  };

  const eventStyleGetter = (event) => {
    const status = event.resource.status;
    let backgroundColor = '#3174ad';
    
    switch (status) {
      case 'Agendada':
        backgroundColor = '#10b981'; // Verde
        break;
      case 'Realizada':
        backgroundColor = '#6366f1'; // Azul
        break;
      case 'Cancelada':
        backgroundColor = '#ef4444'; // Vermelho
        break;
      default:
        backgroundColor = '#6b7280'; // Cinza
    }
    
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm">Agendada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm">Realizada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-sm">Cancelada</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={calendarStyle}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          components={{
            event: EventComponent,
          }}
          messages={{
            next: 'Próximo',
            previous: 'Anterior',
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            agenda: 'Agenda',
            date: 'Data',
            time: 'Hora',
            event: 'Evento',
            noEventsInRange: 'Não há audiências neste período.',
          }}
          formats={{
            monthHeaderFormat: 'MMMM YYYY',
            dayHeaderFormat: 'dddd, DD/MM',
            dayRangeHeaderFormat: ({ start, end }) =>
              `${moment(start).format('DD/MM')} - ${moment(end).format('DD/MM/YYYY')}`,
          }}
        />
      </div>
      
      {showModal && (
        <EventModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CalendarView;
