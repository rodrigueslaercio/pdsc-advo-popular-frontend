export class Causa {
    constructor() {}

    titulo!: string;
    descricao!: string;
    idCliente!: number;
    idAdvogadoResponsavel?: number;
    statusCausa!: StatusCausa;
    tipoCausa!: TipoCausa;
    numeroProcesso!: string;
    tribunal!: string;
    valorCausa!: number; 
}

export enum StatusCausa {
    ABERTA = 'ABERTA',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    ENCERRADA = 'ENCERRADA',
    ARQUIVADA = 'ARQUIVADA'
}

export enum TipoCausa {
    CIVIL = 'CIVIL',
    PENAL = 'PENAL',
    TRABALHISTA = 'TRABALHISTA'
}