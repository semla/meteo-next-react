import { getData } from './data-service'
import styles from './page.module.css'
import { TransformedData } from './types';
import Link from 'next/link';

export default async function Home() {
    const data: TransformedData[] = await getData();
    console.info(data)
    const listItems = getZoneNames(data);
    return (
        <main className={styles.main}>
            <div>
                {listItems}
            </div>
        </main>
    )
}

function getZoneNames(data: TransformedData[]) {
    const list = data.map((z) => <li key={z.idZona}>
        <Link href={z.nom.replace(/\s/g, '-')}>{z.nom}</Link>
    </li>);
    return <ul>{list}</ul>
}
