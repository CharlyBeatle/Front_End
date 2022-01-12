export interface DictadoGenerado {
    Compas?: string[];
    Estado?: boolean;
    Metrica?: string;
    MetricaNotas?: MetricaNotas;
    Nota?: string;
    TextoDictado?: string;
    CantidadCompas?: number;
}

export interface MetricaNotas{
    ValorMetrica?: string;
    Figuras?: Figuras[];
}

export interface Figuras {
    IndiceFigura?: number;
    NombreFigura?: string;
    Valor?: number;
}