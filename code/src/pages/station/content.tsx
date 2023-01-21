import styles from '../../styles/layout.module.scss'
import { useEffect, useState } from 'react';
import React from 'react';

interface Props {
    id: number;
}

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

const Content: React.FC<Props> = ({ id }) => {

    const [stationData, setStationData] = useState<Station>();

    useEffect(() => {
        async function getStation() {
            const url = 'http://localhost:3000/api/getStation';
            const postData = {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id
                }),
            }
            const res = await fetch(url, postData);
            const data = await res.json();
            const station: Station = data.results;

            const stationDataList = Object.entries(station).map(([id, station]) => ({ id, ...station }));
            setStationData(stationDataList);
        }

        //getStation();
        console.log(stationData);
    },[]);

    return(
        <div>Hello</div>
    );
}

export default Content;