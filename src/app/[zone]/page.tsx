import { TransformedData, VariablesValor } from '../types';
import { getData } from '../data-service'

export default async function Page({ params }: { params: { zone: string } }) {
    let zoneName = params.zone;
    // todo: use loading file to set initial value while loading?
    //return <h1>{zoneName}</h1>
    const dataForAllZones: TransformedData[] = await getData(); // cached
    const dataForCurrentZone = getDataForCurrentZone(zoneName, dataForAllZones);
    return <>
        <h1>{dataForCurrentZone?.nom}</h1>
        <p>{dataForCurrentZone?.dataPrediccio}</p>
        <div>{getMeasurements(dataForCurrentZone)}</div>
    </>
}

function getDataForCurrentZone(nameWithHyphens: string, data: TransformedData[]): TransformedData | undefined {
    const nameWithSpaces = nameWithHyphens.replace(/\-/g, ' ');
    return data.find(z => z.nom === nameWithSpaces);
}

function getMeasurements(data: TransformedData | undefined) {
    if (data) {
        const list = data.franjas.map((franja) =>
            <li key={franja.idTipusFranja}>
                {franja.nomTiempo}
                {getValor(franja.variablesValors, franja.nomTiempo)}
            </li>
        );
        return <ul>{list}</ul>
    }
}

function getValor(v: VariablesValor[], nom: string) {
    const list = v.filter((v) => v.valor)
        .map((v) =>
            <li key={v.nom}>
                {v.nom}:{v.valor}
            </li>
        )
    return <ul>{list}</ul>;
}


/* function valores(v: VariablesValor[]) {
*     const list = v.map((z) => <li key={z.nom}>{z.nom},{z.valor},{z.periode}</li>)
*     return <ul>{list}</ul>
* } */

//{valores(z.variablesValors)}
