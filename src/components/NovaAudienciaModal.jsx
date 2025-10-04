import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, FileText, Building, Gavel } from 'lucide-react';

const NovaAudienciaModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: '',
    comarca: '',
    profissional: '',
    local: '',
    data: '',
    hora: '',
    descricao: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Criar nova audiência com dados do formulário
    const novaAudiencia = {
      id: Date.now(),
      cliente: formData.titulo,
      processo: `${Math.floor(Math.random() * 9000000) + 1000000}-${new Date().getFullYear()}.8.04.${Math.floor(Math.random() * 9000) + 1000}`,
      parteAdversa: formData.profissional,
      comarca: formData.comarca,
      orgao: formData.tipo,
      local: formData.local,
      data: formData.data,
      hora: formData.hora,
      status: 'Agendada',
      observacoes: formData.descricao,
      dataCriacao: new Date().toISOString().split('T')[0]
    };

    onSave(novaAudiencia);
    
    // Limpar formulário
    setFormData({
      titulo: '',
      tipo: '',
      comarca: '',
      profissional: '',
      local: '',
      data: '',
      hora: '',
      descricao: ''
    });
    
    onClose();
  };

  const handleCancel = () => {
    // Limpar formulário ao cancelar
    setFormData({
      titulo: '',
      tipo: '',
      comarca: '',
      profissional: '',
      local: '',
      data: '',
      hora: '',
      descricao: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Gavel className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Criar demanda</h2>
              <p className="text-sm text-gray-500">Descreva o que precisa e receba propostas de correspondentes da comarca.</p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Título */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TÍTULO *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Ex.: Audiência de conciliação — 2ª Vara Cível"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Um título claro ajuda os correspondentes a entenderem sua demanda.</p>
            </div>

            {/* Tipo */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TIPO *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Selecione...</option>
                <option value="JEC">JEC</option>
                <option value="VARA CÍVEL">VARA CÍVEL</option>
                <option value="VARA CRIMINAL">VARA CRIMINAL</option>
                <option value="VARA TRABALHISTA">VARA TRABALHISTA</option>
                <option value="VARA DE FAMÍLIA">VARA DE FAMÍLIA</option>
                <option value="JUIZADO ESPECIAL CÍVEL">JUIZADO ESPECIAL CÍVEL</option>
              </select>
            </div>

            {/* Comarca */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                COMARCA (CIDADE) *
              </label>
              <input
                type="text"
                name="comarca"
                value={formData.comarca}
                onChange={handleInputChange}
                placeholder="Digite ao menos 3 letras"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Profissional */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PROFISSIONAL *
              </label>
              <select
                name="profissional"
                value={formData.profissional}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Selecione...</option>
                <option value="ADVOGADO">ADVOGADO</option>
                <option value="CORRESPONDENTE">CORRESPONDENTE</option>
                <option value="ESTAGIÁRIO">ESTAGIÁRIO</option>
              </select>
            </div>

            {/* Local */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LOCAL *
              </label>
              <input
                type="text"
                name="local"
                value={formData.local}
                onChange={handleInputChange}
                placeholder="Ex.: Fórum Central, sala 5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Data */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                DATA *
              </label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Hora */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HORA *
              </label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              DESCRIÇÃO *
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              placeholder="Detalhe a demanda: datas/horários, documentos, etapas, observações, etc."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Publicar demanda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaAudienciaModal;
