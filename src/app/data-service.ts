import { Data, TransformedData, Day } from './types'

export async function getData(day:Day) {
    const url = `https://static-m.meteo.cat/content/opendata/pirineu_${day}.json`;
    console.log('url: ' + url)
    const res = await fetch(url);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    const json: Data = await res.json();
    json.franjes.sort((a, b) => a.idTipusFranja - b.idTipusFranja);
    const transformedData = transformData(json);
    return transformedData;
}


function transformData(originalData: Data): TransformedData[] {
    let transformedData: TransformedData[] = [];

    // First, create a map of zones
    let zoneMap: { [id: number]: TransformedData } = {};
    originalData.franjes.forEach(franje => {
        franje.zones.forEach(zone => {
            if (!zoneMap[zone.idZona]) {
                zoneMap[zone.idZona] = {
                    dataPrediccio: new Date(originalData.dataPrediccio),
                    dataPublicacio: new Date(originalData.dataPublicacio),
                    nom: zone.nom,
                    idZona: zone.idZona,
                    franjas: []
                };
            }

            zoneMap[zone.idZona].franjas.push({
                variablesValors: zone.variablesValors,
                idTipusFranja: franje.idTipusFranja,
                nomTiempo: franje.nom
            });
        });
    });

    // Then convert the map to an array
    for (let id in zoneMap) {
        transformedData.push(zoneMap[id]);
    }

    return transformedData;
}



// function transformData(originalData: Data): TransformedData[] {
//     let transformedData: TransformedData[] = [];

//     originalData.franjes.forEach(franje => {
//         franje.zones.forEach(zone => {
//             let transformedZone: TransformedData = {
//                 dataPrediccio: originalData.dataPrediccio,
//                 dataPublicacio: originalData.dataPublicacio,
//                 nom: zone.nom,
//                 idZona: zone.idZona,
//                 variablesValors: zone.variablesValors,
//                 idTipusFranja: franje.idTipusFranja,
//                 nomTiempo: franje.nom
//             };
//             transformedData.push(transformedZone);
//         });
//     });

//     return transformedData;
// }
