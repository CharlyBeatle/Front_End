export interface DictadoDTO {
    idTipo?: number;
    tipo?: string;
    fecha?: Date;
    calificacion?: boolean;
    detalle?: DetalleDictadoDTO;
    usuario?: string;
}

export interface DetalleDictadoDTO {
    dictadoOriginal?: string;
    dictadoRespuesta?: string;
}