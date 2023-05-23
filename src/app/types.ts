export interface Data {
    dataPrediccio:  string;
    dataPublicacio: string;
    franjes:        Franje[];
}

export interface Franje {
    idTipusFranja: 1|2|3|4|5; // corresponding to the times in order
    nom:  "00:00h - 06:00h" | "06:00 - 12:00h" |  "12:00h - 18:00h" | "18:00h - 24:00h" |  "24h";
    zones: Zone[];
}

export interface Zone {
    variablesValors: VariablesValor[];
    nom: string;
    idZona: 1|2|3|4|5|6|7;
}

export interface VariablesValor {
    nom:     Nom;
    periode: number;
    valor?:  string;
}

export type Nom = "acumulacio" | "cota" | "comentari" | "probabilitat" | "visibilitat" | "acumulacioNeu" | "tempesta" | "cel" | "intensitat";

// export interface TransformedData {
//     dataPrediccio:  string;
//     dataPublicacio: string;
//     nom: string;
//     idZona: 1|2|3|4|5|6|7;
//     variablesValors: VariablesValor[];
//     idTipusFranja: 1|2|3|4|5;
//     nomTiempo:  "00:00h - 06:00h" | "06:00 - 12:00h" |  "12:00h - 18:00h" | "18:00h - 24:00h" |  "24h";
// }

export interface TransformedData {
    dataPrediccio:  string;
    dataPublicacio: string;
    nom: string;
    idZona: 1|2|3|4|5|6|7;
    franjas: {variablesValors: VariablesValor[],
              idTipusFranja: 1|2|3|4|5,
              nomTiempo:  "00:00h - 06:00h" | "06:00 - 12:00h" |  "12:00h - 18:00h" | "18:00h - 24:00h" |  "24h"
             }[];
}
