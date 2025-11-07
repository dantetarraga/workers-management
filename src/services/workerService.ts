import axios from 'axios';
import type { Worker, CreateWorkerDto, UpdateWorkerDto } from '../types/worker';
import { sleep } from '../utils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5055/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const workerService = {
  async getAll(sexFilter?: 'Masculino' | 'Femenino'): Promise<Worker[]> {
    await sleep(1000); 

    try {
      const params = sexFilter ? { sexo: sexFilter } : {};
      const response = await api.get<ApiResponse<Worker[]>>('/workers', { params });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Error al obtener trabajadores');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching workers:', error);
      throw error;
    }
  },

  async create(worker: CreateWorkerDto): Promise<Worker> {
    await sleep(1000); 

    try {
      const response = await api.post<ApiResponse<Worker>>('/workers', worker);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Error al crear trabajador');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Error creating worker:', error);
      throw error;
    }
  },

  async update(worker: UpdateWorkerDto): Promise<Worker> {
    await sleep(1000); 

    try {
      const response = await api.put<ApiResponse<Worker>>(`/workers/${worker.id}`, worker);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Error al actualizar trabajador');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Error updating worker:', error);
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    await sleep(1000); 
    try {
      const response = await api.delete<ApiResponse<null>>(`/workers/${id}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Error al eliminar trabajador');
      }
    } catch (error) {
      console.error('Error deleting worker:', error);
      throw error;
    }
  },
};
