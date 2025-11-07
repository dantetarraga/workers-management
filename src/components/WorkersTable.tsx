import { useState, useEffect } from 'react';
import type { Worker, CreateWorkerDto, UpdateWorkerDto } from '../types/worker';
import { useWorkers } from '../hooks/useWorkers';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import WorkerForm from './WorkerForm';
import Loader from './Loader';
import Avatar from './Avatar';
import { Edit, Trash2, UserPlus, Users, Calendar, MapPin } from 'lucide-react';

type ModalType = 'create' | 'edit' | 'delete';

const WorkersTable = () => {
  const { workers, isLoading, loadWorkers, createWorker, updateWorker, deleteWorker } = useWorkers();
  const { isOpen, open, close } = useModal();
  const [modalType, setModalType] = useState<ModalType>('create');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sexFilter, setSexFilter] = useState<'ALL' | 'M' | 'F'>('ALL');

  useEffect(() => {
    loadWorkers(sexFilter);
  }, [loadWorkers, sexFilter]);

  const handleCreate = () => {
    setModalType('create');
    setSelectedWorker(null);
    open();
  };

  const handleEdit = (worker: Worker) => {
    setModalType('edit');
    setSelectedWorker(worker);
    open();
  };

  const handleDelete = (worker: Worker) => {
    setModalType('delete');
    setSelectedWorker(worker);
    open();
  };

  const handleSubmit = async (data: CreateWorkerDto | UpdateWorkerDto) => {
    setIsSubmitting(true);
    try {
      const success = modalType === 'create'
        ? await createWorker(data as CreateWorkerDto)
        : await updateWorker(data as UpdateWorkerDto);
      
      if (success) close();
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedWorker) return;
    
    setIsSubmitting(true);
    try {
      const success = await deleteWorker(selectedWorker.id);
      if (success) close();
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDocumentBadge = (tipo: string) => {
    const badges = {
      DNI: 'bg-blue-100 text-blue-800',
      CE: 'bg-purple-100 text-purple-800',
      PASAPORTE: 'bg-green-100 text-green-800'
    };
    return badges[tipo as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader size="xl" />
          <p className="mt-4 text-lg text-gray-600 font-medium">Cargando trabajadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Gestión de Trabajadores
                </h1>
                <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {workers.length} {workers.length === 1 ? 'trabajador' : 'trabajadores'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Filtros de sexo */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setSexFilter('ALL')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      sexFilter === 'ALL'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setSexFilter('M')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      sexFilter === 'M'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Masculino
                  </button>
                  <button
                    onClick={() => setSexFilter('F')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      sexFilter === 'F'
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Femenino
                  </button>
                </div>
                
                <button
                  onClick={handleCreate}
                  className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Nuevo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {workers.length === 0 ? (
            <div className="text-center py-16">
              <Users className="mx-auto h-20 w-20 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No hay trabajadores</h3>
              <p className="mt-2 text-sm text-gray-500">
                {sexFilter !== 'ALL' 
                  ? `No hay trabajadores de sexo ${sexFilter === 'M' ? 'masculino' : 'femenino'}`
                  : 'Comienza agregando un nuevo trabajador.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Trabajador
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Documento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Información
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {workers.map((worker, index) => {
                    const rowColor = worker.sexo === 'Masculino' 
                      ? 'hover:bg-blue-50 border-l-4 border-l-blue-400' 
                      : 'hover:bg-orange-50 border-l-4 border-l-orange-400';
                    
                    return (
                      <tr 
                        key={worker.id} 
                        className={`${rowColor} transition-colors duration-150`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Avatar 
                              src={worker.foto} 
                              name={`${worker.nombres} ${worker.apellidos}`}
                              size="md"
                            />
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {worker.nombres} {worker.apellidos}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center mt-0.5">
                                {worker.sexo === 'Masculino' ? 'Masculino' : 'Femenino'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentBadge(worker.tipoDocumento)}`}>
                              {worker.tipoDocumento}
                            </span>
                            <div className="text-sm text-gray-700 font-mono mt-1">
                              {worker.numeroDocumento}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center mb-1">
                              <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                              <span className="text-xs text-gray-600">{formatDate(worker.fechaNacimiento)}</span>
                            </div>
                            {worker.direccion && (
                              <div className="flex items-center text-xs text-gray-500 truncate max-w-xs">
                                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                {worker.direccion}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleEdit(worker)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200"
                              title="Editar trabajador"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(worker)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200"
                              title="Eliminar trabajador"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      {(modalType === 'create' || modalType === 'edit') && (
        <Modal
          isOpen={isOpen}
          onClose={close}
          title={modalType === 'create' ? 'Crear Nuevo Trabajador' : 'Editar Trabajador'}
          size="lg"
        >
          <WorkerForm
            worker={selectedWorker || undefined}
            onSubmit={handleSubmit}
            onCancel={close}
            isLoading={isSubmitting}
          />
        </Modal>
      )}

      {modalType === 'delete' && selectedWorker && (
        <Modal
          isOpen={isOpen}
          onClose={close}
          title="Confirmar Eliminación"
        >
          <div className="text-center py-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-50 mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ¿Estás seguro?
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Vas a eliminar permanentemente a:
            </p>
            <p className="text-base font-semibold text-gray-900 mb-1">
              {selectedWorker.nombres} {selectedWorker.apellidos}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {selectedWorker.tipoDocumento}: {selectedWorker.numeroDocumento}
            </p>
            <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-6">
              <p className="text-xs text-red-700">
                Esta acción no se puede deshacer
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={close}
                disabled={isSubmitting}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={isSubmitting}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {isSubmitting && <Loader size="sm" />}
                Eliminar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WorkersTable;