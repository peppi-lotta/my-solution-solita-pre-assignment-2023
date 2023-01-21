import styles from '../../styles/layout.module.scss'
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/pagination';

interface Trip {
    id: number;
    start_time: string;
    end_time: string;
    start_locatin_id: number;
    end_location_id: number;
    duration: number;
    distance: number;
    start_name_fi: string;
    end_name_fi: string;
}


export default function Content() {

    const [tripsData, settripsData] = useState<Trip[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    const items_length = 400;

    useEffect(() => {
        async function gettrips() {
            console.log("Inside get");
            const url = 'http://localhost:3000/api/getTrips';
            const postData = {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    page: currentPage
                }),
            }
            const res = await fetch(url, postData);
            const data = await res.json();
            const trips: Trip[] = data.results;

            const tripsDataList = Object.entries(trips).map(([id, trip]) => ({ id, ...trip }));
            settripsData(tripsDataList);
        }

        gettrips();
    }, [currentPage]);

    console.log(tripsData);
    return (
        <div className={styles.wrap}>
            <table className={styles.styled_table}>
                <thead>
                    <tr>
                        <th>Lähtöpaikka</th>
                        <th>Lopetuspaikka</th>
                        <th>Kesto minuuteissa</th>
                        <th>Etäisyys kilometreissä</th>
                    </tr>
                </thead>
                <tbody>
                    {tripsData.map((trip) => (
                        <tr>
                            <td>{trip.start_name_fi}</td>
                            <td>{trip.end_name_fi}</td>
                            <td>{(Math.round(trip.duration/60)).toFixed(0)}</td>
                            <td>{trip.distance/1000}</td>
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