export class Veiculo {
    public id?: number;
    public veiculo?: string;
    public descricao?: string;
    public cor?: CorType;
    public ano?: number;
    public vendido?: boolean;
    public marca?: MarcaType;
    public created?: Date;
    public updated?: Date;
}


export enum MarcaType {
    HONDA = "HONDA",
    FIAT = "FIAT",
    FORD = "FORD",
    CHEVROLET = "CHEVROLET",
    VOLKSWAGEN = "VOLKSWAGEN"
}

export enum CorType {
    BRANCO = "BRANCO",
    PRETO = "PRETO",
    VERMELHO = "VERMELHO",
    AZUL = "AZUL",
    VERDE = "VERDE",
    AMARELO = "AMARELO"
}