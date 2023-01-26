
import getPopular from '@/pages/api/getPopular';
import styles from '@/styles/layout.module.scss'
import React, { useState, useEffect } from 'react';

interface popular { //defining interface Trip
    name_fi: string;
    locations_count: number;
}

interface Props { //defining Props interface
    id: number; //total number of items
    type: string; //number of items per page
}

const Popular: React.FC<Props> = ({ id, type }) => {
    const [popularData, setPopularData] = useState<popular[]>([]);//state for storing trip data
    const [i, setI] = useState(0); //here to avooid infinite loop of updates

    //useEffect hook to fetch data. This hook is tied to current page number and new call is made every time page changes
    useEffect(() => {

        async function getPopular() {
            const url = process.env.NEXT_PUBLIC_BASE_URL + 'api/getPopular'; //URL to fetch data from
            const postData = {
                method: "Post", //HTTP method
                headers: { "Content-Type": "application/json" }, //headers for the request
                body: JSON.stringify({
                    id: id, //getCount of station's trips
                    type: type
                }),
            }

            //fetching data from the URL
            const res = await fetch(url, postData);
            const data = await res.json();
            const populars: popular[] = data.results;

            //converting data to tripsdatalist
            const popularsDataList = Object.entries(populars).map(([id, popular]) => ({ id, ...popular }));
            setPopularData(popularsDataList);
        }
        getPopular();

    }, [i]);

    //rendering the table with station data and pagination component
    return (
        <div>
            <div className={styles.infobox}>
                {(type == 'start') &&
                    <>
                        <strong>Suosituimmat lähtöpysäkit tänne palautetuille pyörille</strong>

                    </>
                }
                {(type == 'end') &&
                    <>
                        <strong>Suosituimmat palautuspysäkit täältä lähteneille pyörille</strong>
                    </>
                }
                {popularData.map((popular) => (
                    <div>{popular.name_fi}, {popular.locations_count}</div>
                ))}
            </div>
        </div>
    );
}
export default Popular;