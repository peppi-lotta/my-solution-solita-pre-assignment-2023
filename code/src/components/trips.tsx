
import styles from '@/styles/layout.module.scss'
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
    loc_name_fi: string;
}


interface Props { //defining Props interface
    id: number; //total number of items
    attribute: string; //number of items per page
}

const Trips: React.FC<Props> = ({ id, attribute }) => {
    const [tripsData, settripsData] = useState<Trip[]>([]);//state for storing trip data
    const [currentPage, setCurrentPage] = useState(1);//state for storing current page number
    const pageSize = 10;//number of items per page
    const [row_count, setCount] = useState(1); //total number of rows in table

    //useEffect hook to fetch data. This hook is tied to current page number and new call is made every time page changes
    useEffect(() => {

        async function getCount() {
            const url = 'http://localhost:3000/api/getCount'; //URL to fetch data from
            const postData = {
                method: "Post", //HTTP method
                headers: { "Content-Type": "application/json" }, //headers for the request
                body: JSON.stringify({
                    table: 'trips', //getCount of station's trips
                    attribute: attribute,
                    value: id
                }),
            }
            //fetching data from the URL
            const res = await fetch(url, postData);
            const data = await res.json();
            setCount(data.results[0].count)
        }

        async function gettrips() {

            const url = 'http://localhost:3000/api/getTrips';//URL to fetch data from

            let postData;
            let body;
            if (attribute == '') {
                postData = {
                    method: "Post",//HTTP method
                    headers: { "Content-Type": "application/json" },//headers for the request
                    body: JSON.stringify({
                        page: currentPage, //page number to be sent in the request body
                    })
                }
            } else {
                postData = {
                    method: "Post",//HTTP method
                    headers: { "Content-Type": "application/json" },//headers for the request
                    body: body = JSON.stringify({
                        page: currentPage, //page number to be sent in the request body
                        attribute: attribute,
                        value: id
                    })
                }
            }


            //fetching data from the URL
            const res = await fetch(url, postData);
            const data = await res.json();
            const trips: Trip[] = data.results;

            //converting data to tripsdatalist
            const tripsDataList = Object.entries(trips).map(([id, trip]) => ({ id, ...trip }));
            settripsData(tripsDataList);
        }
        getCount();
        gettrips();
    }, [currentPage]);

    //function to handle page changes
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    //rendering the table with station data and pagination component
    return (
        <div className={styles.scrollable_table_view}>
            <div className={styles.scrollable_table_container}>
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
                                <td>{trip.loc_name_fi}</td>
                                <td>{trip.loc_name_fi}</td>
                                <td>{(Math.round(trip.duration / 60)).toFixed(0)}</td>
                                <td>{trip.distance / 1000}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                items={row_count}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </div>
    );
}
export default Trips;