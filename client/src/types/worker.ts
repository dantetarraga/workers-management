export interface Worker {
  id: number;
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  sexo: string;
  fechaNacimiento: string;
  foto?: string;
  direccion?: string;
  fechaCreacion: string;
  fechaModificacion?: string;
}

export interface CreateWorkerDto {
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  sexo: string;
  fechaNacimiento: string;
  foto?: string;
  direccion?: string;
}

export interface UpdateWorkerDto extends CreateWorkerDto {
  id: number;
}