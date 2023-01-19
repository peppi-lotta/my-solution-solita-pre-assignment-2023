import styles from '../../styles/layout.module.scss'
import React, { useState, useEffect } from 'react';

interface Station {
    id: number;
    name_fi: string;
    name_sw: string;
    name_en: string;
    address_fi: string;
    address_sw: string;
    city_fi: string;
    city_sw: string;
    operator: string;
    capacity: number;
    x_cord: number;
    y_cord: number;
}

export default function Content() {
    const [stationsData, setStationsData] = useState<Station[]>([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        console.log('Haloo');
        async function getStations() {
            const res = await fetch('http://localhost:3000/api/getStations');
            const data = await res.json();
            const stations: Station[] = data.results;
            console.log(stations);

            const stationsDataList = Object.entries(stations).map(([id, station]) => ({ id, ...station }));
            setStationsData(stationsDataList);
        }

        getStations();

    }, [value]);
    const onChange = ({ target }) => setValue(target.value);

    return (
        <div className={styles.wrap}>
            <form>
                <input type="text" value={value} onChange={onChange} />
            </form>
            <table className={styles.styled_table}>
                <thead>
                    <tr>
                        <th>Pysäkin nimi</th>
                        <th>Osoite</th>
                        <th>Kapasiteetti</th>
                    </tr>
                </thead>
                <tbody>
                    {stationsData.map((station) => (
                        <tr>
                            <td>{station.name_fi}</td>
                            <td>{station.address_fi}</td>
                            <td>{station.capacity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}