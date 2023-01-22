import styles from '../../styles/layout.module.scss'
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/pagination';

interface Trip { //defining interface Trip
    id: number;
    start_time: string;
    end_time: string;
    start_location_id: number;
    end_location_id: number;
    duration: number;
    distance: number;
    start_name_fi: string;
    end_name_fi: string;
}


export default function Content() {//has whole content shown in the trips page

    const [tripsData, settripsData] = useState<Trip[]>([]);//state for storing trip data
    const [currentPage, setCurrentPage] = useState(1);//state for storing current page number
    const pageSize = 10;//number of items per page
    const [row_count, setCount] = useState(1); //total number of rows in table

    //function to handle page changes
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    //useEffect hook to fetch count of rows. This hook is tied to row_count and should only be called once at page load
    useEffect(() => {
        async function getCount() {
            const url = 'http://localhost:3000/api/getCount'; //URL to fetch data from
            const postData = {
                method: "Post", //HTTP method
                headers: { "Content-Type": "application/json" }, //headers for the request
                body: JSON.stringify({
                    table: 'trips' //getCount of all rows in stations table
                }),
            }
            //fetching data from the URL
            const res = await fetch(url, postData);
            const data = await res.json();
            console.log(data);
            setCount(data.results[0].count)
        }
        getCount();
    }, [row_count]);

    //useEffect hook to fetch data. This hook is tied to current page number and new call is made every time page changes
    useEffect(() => {
        async function gettrips() {
            console.log("Inside get");
            const url = 'http://localhost:3000/api/getTrips';//URL to fetch data from
            const postData = {
                method: "Post",//HTTP method
                headers: { "Content-Type": "application/json" },//headers for the request
                body: JSON.stringify({
                    page: currentPage //page number to be sent in the request body
                }),
            }
            //fetching data from the URL
            const res = await fetch(url, postData);
            const data = await res.json();
            const trips: Trip[] = data.results;

            //converting data to tripsdatalist
            const tripsDataList = Object.entries(trips).map(([id, trip]) => ({ id, ...trip }));
            settripsData(tripsDataList);
        }

        gettrips();
    }, [currentPage]);

    //rendering the table with station data and pagination component
    return (
        <div className={styles.wrap}>
            <div className={styles.table_view}>
                <table className={styles.styled_table}>
                    <thead>
                        {/* Table header */}
                        <tr>
                            <th>Lähtöpaikka</th>
                            <th>Lopetuspaikka</th>
                            <th>Kesto minuuteissa</th>
                            <th>Etäisyys kilometreissä</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map trips' data as rows of the table */}
                        {tripsData.map((trip) => (
                            <tr>
                                <td>{trip.start_name_fi}</td>
                                <td>{trip.end_name_fi}</td>
                                <td>{(Math.round(trip.duration / 60)).toFixed(0)}</td>
                                <td>{trip.distance / 1000}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    items={row_count}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
}