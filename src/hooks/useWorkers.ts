import { useState, useCallback } from 'react';
import type { Worker, CreateWorkerDto, UpdateWorkerDto } from '../types/worker';
import { toast } from 'react-toastify';
import { workerService } from '../services/workerService';

export const useWorkers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadWorkers = useCallback(async (sexFilter?: 'ALL' | 'M' | 'F') => {
    try {
      setIsLoading(true);
      const filterParam = sexFilter === 'M' ? 'Masculino' : sexFilter === 'F' ? 'Femenino' : undefined;
      const data = await workerService.getAll(filterParam);
      setWorkers(data);
    } catch (error) {
      toast.error('Error al cargar trabajadores');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createWorker = useCallback(async (worker: CreateWorkerDto) => {
    try {
      setIsLoading(true);
      const newWorker = await workerService.create(worker);
      setWorkers(prev => [...prev, newWorker]);
      toast.success('Trabajador creado exitosamente');
      return true;
    } catch (error) {
      toast.error('Error al crear trabajador');
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateWorker = useCallback(async (worker: UpdateWorkerDto) => {
    try {
      setIsLoading(true);
      const updatedWorker = await workerService.update(worker);
      setWorkers(prev => prev.map(w => w.id === updatedWorker.id ? updatedWorker : w));
      toast.success('Trabajador actualizado exitosamente');
      return true;
    } catch (error) {
      toast.error('Error al actualizar trabajador');
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteWorker = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      await workerService.delete(id);
      setWorkers(prev => prev.filter(w => w.id !== id));
      toast.success('Trabajador eliminado exitosamente');
      return true;
    } catch (error) {
      toast.error('Error al eliminar trabajador');
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    workers,
    isLoading,
    loadWorkers,
    createWorker,
    updateWorker,
    deleteWorker,
  };
};