
import styles from '../../styles/layout.module.scss';//importing styles
import React, { useState, useEffect } from 'react'; //funtional imports
import Pagination from '@/components/pagination'; //component immports

interface Station { //defining interface Station
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

export default function Content() { //has whole content shown in the stations page
    
    const [stationsData, setStationsData] = useState<Station[]>([]);//state for storing station data
    const [currentPage, setCurrentPage] = useState(1);//state for storing current page number
    const pageSize = 10; //number of items per page
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
                    table: 'stations' //getCount of all rows in stations table
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
        async function getStations() {
            const url = 'http://localhost:3000/api/getStations'; //URL to fetch data from
            const postData = {
                method: "Post", //HTTP method
                headers: { "Content-Type": "application/json" }, //headers for the request
                body: JSON.stringify({
                    page: currentPage //page number to be sent in the request body
                }),
            }
            //fetching data from the URL
            const res = await fetch(url, postData);
            const data = await res.json();
            const stations: Station[] = data.results;

            //converting data to stationdatalist
            const stationsDataList = Object.entries(stations).map(([id, station]) => ({ id, ...station }));
            setStationsData(stationsDataList);
        }

        getStations();
    }, [currentPage]);

    //rendering the table with station data and pagination component
    return (
        <div className={styles.wrap}>
            <div className={styles.table_view}>
                
                <table className={styles.styled_table}>
                    <thead>
                        {/* Table header */}
                        <tr>
                            <th>Pysäkin nimi</th>
                            <th>Osoite</th>
                            <th>Kapasiteetti</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map stations' data as rows of the table */}
                        {stationsData.map((station) => (
                            <tr>
                                <td>{station.name_fi}</td>
                                <td>{station.address_fi}</td> 
                                <td>{station.capacity}</td> 
                                {/* This button takes the user to the station view page of the correct id  */}
                                <td><a href={"http://localhost:3000/station/" + station.id}><button className={styles.basic_btn} type="button">Katso yksityiskohdat</button></a></td>
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