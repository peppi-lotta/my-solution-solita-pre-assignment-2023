import styles from '../../styles/layout.module.scss'
import React, { useState, useEffect } from 'react';
import Pagination from '../../components/pagination';

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

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    const items_length = 400;

    useEffect(() => {
        async function getStations() {
            console.log("Inside get");
            const url = 'http://localhost:3000/api/getStations';
            const postData = {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    page: currentPage
                }),
            }
            const res = await fetch(url, postData);
            const data = await res.json();
            const stations: Station[] = data.results;

            const stationsDataList = Object.entries(stations).map(([id, station]) => ({ id, ...station }));
            setStationsData(stationsDataList);
        }

        getStations();
    }, [currentPage]);



    console.log(currentPage);
    return (
        <div className={styles.wrap}>
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
            <Pagination
                items={items_length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </div>
    );
}