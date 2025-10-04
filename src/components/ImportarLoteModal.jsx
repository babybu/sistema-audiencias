import React, { useState, useRef } from 'react';
import { X, Upload, FileImage, FileSpreadsheet, FileText, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ImportarLoteModal = ({ isOpen, onClose, onImport }) => {
  const [arquivos, setArquivos] = useState([]);
  const [processando, setProcessando] = useState(false);
  const [resultados, setResultados] = useState([]);
  const fileInputRef = useRef(null);

  const tiposAceitos = {
    'image/*': { icon: FileImage, label: 'Imagens', desc: 'JPG, PNG - Pautas escaneadas' },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { icon: FileSpreadsheet, label: 'Excel', desc: 'XLSX - Planilhas de dados' },
    'application/vnd.ms-excel': { icon: FileSpreadsheet, label: 'Excel', desc: 'XLS - Planilhas de dados' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: FileText, label: 'Word', desc: 'DOCX - Documentos' },
    'application/msword': { icon: FileText, label: 'Word', desc: 'DOC - Documentos' },
    'application/pdf': { icon: File, label: 'PDF', desc: 'Pautas em PDF' },
    'text/csv': { icon: FileSpreadsheet, label: 'CSV', desc: 'Dados separados por vírgula' }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const novosArquivos = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      status: 'pendente'
    }));
    
    setArquivos(prev => [...prev, ...novosArquivos]);
  };

  const removerArquivo = (id) => {
    setArquivos(prev => prev.filter(arquivo => arquivo.id !== id));
  };

  const formatarTamanho = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIconeArquivo = (tipo) => {
    for (const [tipoAceito, config] of Object.entries(tiposAceitos)) {
      if (tipo.match(tipoAceito.replace('*', '.*'))) {
        return config.icon;
      }
    }
    return File;
  };

  const extrairDadosArquivo = async (arquivo) => {
    // Simular extração de dados (aqui você integraria com IA/OCR real)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Dados simulados extraídos do arquivo
        const dadosExtraidos = [
          {
            cliente: `Cliente extraído de ${arquivo.nome.split('.')[0]}`,
            processo: `${Math.floor(Math.random() * 9000000) + 1000000}-${new Date().getFullYear()}.8.04.${Math.floor(Math.random() * 9000) + 1000}`,
            parteAdversa: 'Parte Adversa Extraída',
            comarca: 'MANAUS - AM',
            orgao: 'JEC',
            local: 'Fórum Central',
            data: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            hora: `${Math.floor(Math.random() * 12) + 8}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00`,
            status: 'Agendada',
            observacoes: `Dados extraídos automaticamente de ${arquivo.nome}`,
            dataCriacao: new Date().toISOString().split('T')[0]
          }
        ];
        
        resolve(dadosExtraidos);
      }, 2000 + Math.random() * 3000); // Simular tempo de processamento
    });
  };

  const processarArquivos = async () => {
    if (arquivos.length === 0) return;
    
    setProcessando(true);
    setResultados([]);
    
    const todasAudiencias = [];
    
    for (const arquivo of arquivos) {
      try {
        // Atualizar status para processando
        setArquivos(prev => prev.map(a => 
          a.id === arquivo.id ? { ...a, status: 'processando' } : a
        ));
        
        // Extrair dados do arquivo
        const audienciasExtraidas = await extrairDadosArquivo(arquivo);
        
        // Atualizar status para concluído
        setArquivos(prev => prev.map(a => 
          a.id === arquivo.id ? { ...a, status: 'concluido', audienciasExtraidas } : a
        ));
        
        todasAudiencias.push(...audienciasExtraidas);
        
        setResultados(prev => [...prev, {
          arquivo: arquivo.nome,
          status: 'sucesso',
          quantidade: audienciasExtraidas.length,
          audiencias: audienciasExtraidas
        }]);
        
      } catch (error) {
        // Atualizar status para erro
        setArquivos(prev => prev.map(a => 
          a.id === arquivo.id ? { ...a, status: 'erro', erro: error.message } : a
        ));
        
        setResultados(prev => [...prev, {
          arquivo: arquivo.nome,
          status: 'erro',
          erro: error.message
        }]);
      }
    }
    
    setProcessando(false);
    
    // Importar todas as audiências extraídas
    if (todasAudiencias.length > 0) {
      onImport(todasAudiencias);
    }
  };

  const limparTudo = () => {
    setArquivos([]);
    setResultados([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Importar em Lote</h2>
              <p className="text-sm text-gray-500">Extraia dados de arquivos e importe automaticamente para sua pauta.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Área de Upload */}
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Arraste arquivos aqui ou clique para selecionar
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Suporte para imagens, Excel, Word, PDF e CSV
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.xlsx,.xls,.docx,.doc,.pdf,.csv"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Selecionar Arquivos
            </button>
          </div>

          {/* Tipos de arquivo aceitos */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(tiposAceitos).slice(0, 6).map(([tipo, config]) => {
              const Icon = config.icon;
              return (
                <div key={tipo} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Icon className="w-4 h-4 text-gray-600" />
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">{config.label}</div>
                    <div className="text-gray-500">{config.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lista de Arquivos */}
        {arquivos.length > 0 && (
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Arquivos Selecionados ({arquivos.length})
              </h3>
              <button
                onClick={limparTudo}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Limpar Tudo
              </button>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {arquivos.map((arquivo) => {
                const Icon = getIconeArquivo(arquivo.tipo);
                return (
                  <div key={arquivo.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Icon className="w-8 h-8 text-gray-600" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{arquivo.nome}</div>
                      <div className="text-sm text-gray-500">{formatarTamanho(arquivo.tamanho)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {arquivo.status === 'pendente' && (
                        <span className="text-xs text-gray-500">Pendente</span>
                      )}
                      {arquivo.status === 'processando' && (
                        <div className="flex items-center gap-1">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                          <span className="text-xs text-blue-600">Processando...</span>
                        </div>
                      )}
                      {arquivo.status === 'concluido' && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-600">
                            {arquivo.audienciasExtraidas?.length || 0} audiências
                          </span>
                        </div>
                      )}
                      {arquivo.status === 'erro' && (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-xs text-red-600">Erro</span>
                        </div>
                      )}
                      <button
                        onClick={() => removerArquivo(arquivo.id)}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
                        disabled={processando}
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Resultados */}
        {resultados.length > 0 && (
          <div className="px-6 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resultados da Extração</h3>
            <div className="space-y-2">
              {resultados.map((resultado, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {resultado.status === 'sucesso' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{resultado.arquivo}</div>
                    {resultado.status === 'sucesso' ? (
                      <div className="text-sm text-green-600">
                        {resultado.quantidade} audiências extraídas com sucesso
                      </div>
                    ) : (
                      <div className="text-sm text-red-600">
                        Erro: {resultado.erro}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {arquivos.length > 0 && (
              <>
                {arquivos.filter(a => a.status === 'concluido').length} de {arquivos.length} processados
              </>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={processando}
            >
              Fechar
            </button>
            <button
              onClick={processarArquivos}
              disabled={arquivos.length === 0 || processando}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {processando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Processar e Importar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportarLoteModal;
