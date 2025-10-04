import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  MapPin, 
  User, 
  FileText, 
  Building, 
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AudienciaCard = ({ audiencia, onView, onEdit, onDelete }) => {
  // Função para formatar data no padrão brasileiro
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para formatar hora
  const formatTime = (timeString) => {
    if (!timeString) return '';
    // Se já está no formato HH:MM, retorna como está
    if (timeString.includes(':')) {
      return timeString;
    }
    // Caso contrário, tenta formatar
    return timeString;
  };

  // Função para formatar data e hora juntas
  const formatDateTime = (date, time) => {
    const formattedDate = formatDate(date);
    const formattedTime = formatTime(time);
    return `${formattedDate} ${formattedTime}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Agendada':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Realizada':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cancelada':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getBorderColor = (status) => {
    switch (status) {
      case 'Agendada':
        return 'border-l-green-500';
      case 'Realizada':
        return 'border-l-blue-500';
      case 'Cancelada':
        return 'border-l-red-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Agendada':
        return '🟢';
      case 'Realizada':
        return '🔵';
      case 'Cancelada':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <Card className={`hover:shadow-md transition-all duration-200 border-l-4 ${getBorderColor(audiencia.status)} bg-white`}>
      <CardContent className="p-4">
        {/* Header com nome e ações */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Audiência</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(audiencia)}>
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(audiencia)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(audiencia)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Nome do cliente em destaque */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-green-600 mb-1">
            {audiencia.cliente.toUpperCase()}
          </h3>
          <Badge className={`text-xs ${getStatusColor(audiencia.status)}`}>
            {getStatusIcon(audiencia.status)} {audiencia.status}
          </Badge>
        </div>

        {/* Informações em duas colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Coluna esquerda */}
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-gray-700">Status:</span>
              <span className="ml-2 text-gray-600">{audiencia.status}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Prazo:</span>
              <span className="ml-2 text-gray-600">
                {formatDateTime(audiencia.data, audiencia.hora)}
              </span>
            </div>
          </div>

          {/* Coluna direita */}
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-gray-700">Processo:</span>
              <span className="ml-2 text-gray-600 font-mono text-xs">
                {audiencia.processo}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Data da criação:</span>
              <span className="ml-2 text-gray-600">
                {formatDateTime(audiencia.data, audiencia.hora)}
              </span>
            </div>
          </div>
        </div>

        {/* Informações adicionais em linha */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-red-500" />
              <span>vs. {audiencia.parteAdverso}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-indigo-500" />
              <span>{audiencia.comarca} - {audiencia.uf}</span>
            </div>
            <div className="flex items-center gap-1">
              <Building className="h-3 w-3 text-orange-500" />
              <span>{audiencia.orgao}</span>
            </div>
            {audiencia.local && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-gray-500" />
                <span>{audiencia.local}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudienciaCard;
