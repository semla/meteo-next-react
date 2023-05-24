import { getData } from './data-service'
//import styles from './page.module.css'
import { TransformedData } from './types';
import Link from 'next/link';

export default async function Home() {

    const dataToday: TransformedData[] = await getData('avui');
    const listItemsToday = getZoneNames(dataToday, 'avui');

    const dataTomorrow: TransformedData[] = await getData('dema');
    const listItemsTomorrow = getZoneNames(dataTomorrow, 'dema');

    return (
        <main>
            <div>
                <section><p>Avui</p>
                    {listItemsToday}
                </section>
                <section><p>Dema</p>
                    {listItemsTomorrow}
                </section>
            </div>
        </main>
    )
}

function getZoneNames(data: TransformedData[], day:string) {
    const list = data.map((z) => <li key={z.idZona}>
        <Link href={`${z.nom.replace(/\s/g, '-')}/${day}`}>{z.nom}</Link>
    </li>);
    return <ul>{list}</ul>
}
