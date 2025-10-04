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
  const getStatusColor = (status) => {
    switch (status) {
      case 'Agendada':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Realizada':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelada':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-gray-900 truncate">
                {audiencia.cliente}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Clock className="h-4 w-4" />
              <span>{audiencia.data} às {audiencia.hora}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={`text-xs ${getStatusColor(audiencia.status)}`}>
              {getStatusIcon(audiencia.status)} {audiencia.status}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="h-4 w-4 text-purple-600" />
            <span className="truncate">{audiencia.processo}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4 text-red-600" />
            <span className="truncate">vs. {audiencia.parteAdverso}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-indigo-600" />
              <span>{audiencia.comarca} - {audiencia.uf}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building className="h-4 w-4 text-orange-600" />
              <span>{audiencia.orgao}</span>
            </div>
          </div>
        </div>
        
        {audiencia.local && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="truncate">{audiencia.local}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudienciaCard;
