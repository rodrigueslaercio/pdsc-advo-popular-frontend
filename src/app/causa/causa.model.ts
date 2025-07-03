export class Causa {
  constructor(
    public id?: number,
    public titulo: string = '',
    public descricao: string = '',
    public idCliente?: number,
    public statusCausa: StatusCausa = {} as StatusCausa,
    public tipoCausa: TipoCausa = {} as TipoCausa,
    public numeroProcesso: string = '',
    public tribunal: string = '',
    public valorCausa: number | null = null,
    public idAdvogadoResponsavel?: number
  ) {}
}
export enum StatusCausa {
    ABERTA = 'ABERTA',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    ENCERRADA = 'ENCERRADA',
    ARQUIVADA = 'ARQUIVADA'
}

export enum TipoCausa {
    CIVIL = 'CIVIL',
    CRIMINAL = 'CRIMINAL',
    TRABALHISTA = 'TRABALHISTA',
    FAMILIA = 'FAMILIA',
    OUTRO = 'OUTRO'
}