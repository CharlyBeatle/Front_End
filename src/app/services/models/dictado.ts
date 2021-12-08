export interface DictadoDTO {
    tipo?: string;
    fecha?: Date;
    calificacion?: boolean;
    detalle?: DetalleDictadoDTO;
}

export interface DetalleDictadoDTO {
    dictadoOriginal?: string;
    dictadoRespuesta?: string;
}