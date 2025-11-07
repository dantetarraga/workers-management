import { useState, useEffect } from 'react';
import type { Worker, CreateWorkerDto, UpdateWorkerDto } from '../types/worker';
import Loader from './Loader';
import { User, FileText, Info, MapPin, Save, Plus } from 'lucide-react';

interface WorkerFormProps {
  worker?: Worker;
  onSubmit: (data: CreateWorkerDto | UpdateWorkerDto) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const WorkerForm = ({ worker, onSubmit, onCancel, isLoading = false }: WorkerFormProps) => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    numeroDocumento: '',
    sexo: '',
    fechaNacimiento: '',
    foto: '',
    direccion: ''
  });

  useEffect(() => {
    if (worker) {
      setFormData({
        nombres: worker.nombres,
        apellidos: worker.apellidos,
        tipoDocumento: worker.tipoDocumento,
        numeroDocumento: worker.numeroDocumento,
        sexo: worker.sexo,
        fechaNacimiento: worker.fechaNacimiento.split('T')[0],
        foto: worker.foto || '',
        direccion: worker.direccion || ''
      });
    }
  }, [worker]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = worker 
      ? { ...formData, id: worker.id } as UpdateWorkerDto
      : formData as CreateWorkerDto;

    await onSubmit(submitData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información Personal */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-600" />
          Información Personal
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombres <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="Ingrese los nombres"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellidos <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="Ingrese los apellidos"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Documentación */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-600" />
          Documentación
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Documento <span className="text-red-500">*</span>
            </label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors bg-white"
            >
              <option value="">Seleccionar tipo...</option>
              <option value="DNI">DNI</option>
              <option value="CE">Carnet de Extranjería</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Documento <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleChange}
              required
              maxLength={20}
              placeholder="Ej: 12345678"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Datos Adicionales */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-gray-600" />
          Datos Adicionales
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sexo <span className="text-red-500">*</span>
            </label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors bg-white"
            >
              <option value="">Seleccionar sexo...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Nacimiento <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Información de Contacto */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-600" />
          Información de Contacto
        </h4>
        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              maxLength={200}
              placeholder="Ingrese la dirección completa"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto (URL)
            </label>
            <input
              type="url"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              maxLength={500}
              placeholder="https://ejemplo.com/foto.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {isLoading ? (
            <Loader size="sm" />
          ) : worker ? (
            <Save className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {worker ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default WorkerForm;