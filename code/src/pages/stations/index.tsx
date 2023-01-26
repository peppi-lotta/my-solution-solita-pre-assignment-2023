
import styles from '../../styles/layout.module.scss';//importing styles
import React, { useState, useEffect } from 'react'; //funtional imports
import Pagination from '@/components/pagination'; //component immports
import Image from 'next/image';

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
    const [sortBy, setSortBy] = useState('');
    const [search, setSearch] = useState('');

    //function to handle page changes
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    //useEffect hook to fetch count of rows. This hook is tied to row_count and should only be called once at page load
    useEffect(() => {
        async function getCount() {
            const url = process.env.NEXT_PUBLIC_BASE_URL + 'api/getCount'; //URL to fetch data from
            const postData = {
                method: "Post", //HTTP method
                headers: { "Content-Type": "application/json" }, //headers for the request
                body: JSON.stringify({
                    table: 'stations', //getCount of all rows in stations table
                    search: search
                }),
            }
            //fetching data from the URL
            const res = await fetch(url, postData);
            const data = await res.json();

            setCount(data.results[0].count)
        }
        getCount();
    }, [row_count, search]);


    //useEffect hook to fetch data. This hook is tied to current page number and new call is made every time page changes
    useEffect(() => {
        async function getStations() {
            const url = process.env.NEXT_PUBLIC_BASE_URL + 'api/getStations'; //URL to fetch data from
            const postData = {
                method: "Post", //HTTP method
                headers: { "Content-Type": "application/json" }, //headers for the request
                body: JSON.stringify({
                    page: currentPage, //page number to be sent in the request body
                    order: sortBy,
                    search: search
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
    }, [currentPage, sortBy, search]);

    //function to handle seting sorting info
    const onSetSort = (type: string) => {
        if (type == sortBy) {
            setSortBy('');
        }else {
            setSortBy(type)
        }
    };

    //rendering the table with station data and pagination component
    return (
        <div className={styles.wrap}>
            <div className={styles.form_item}>
                <label>Hae: </label>
                <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className={styles.row} >
                <Image
                    src="/womanWbike.svg" //get image from 'public' folder
                    alt="woman with bike" //alternative text for the image
                    width={500}
                    height={500}
                />
                <div className={`${styles.table_view} ${styles.half}`}>
                    <table className={styles.styled_table}>
                        <thead>
                            {/* Table header */}
                            <tr className={styles.sorting}>
                                <th><button onClick={ () => onSetSort('name_fi') }  >Pysäkin nimi</button></th>
                                <th><button onClick={ () => onSetSort('address_fi') }  >Osoite</button></th>
                                <th><button onClick={ () => onSetSort('capacity') }  >Kapasiteetti</button></th>
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
                                    <td><a href={process.env.NEXT_PUBLIC_BASE_URL + "station/" + station.id}><button className={styles.basic_btn} type="button">                
                                    <Image
                                        src="/right-arrow.png" //get image from 'public' folder
                                        alt="woman with bike" //alternative text for the image
                                        width={40}
                                        height={40}
                                        color='inverted'
                                    /></button></a></td>
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

        </div>
    );
}