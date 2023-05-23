import { TransformedData } from '../types';

export default function Page({ params }: { params: { slug: string } }) {
  console.info(params)
  return <h1>{params.slug}</h1>;
}

/* function valores(v: VariablesValor[]) {
*     const list = v.map((z) => <li key={z.nom}>{z.nom},{z.valor},{z.periode}</li>)
*     return <ul>{list}</ul>
* } */

//{valores(z.variablesValors)}
