import styles from '../../styles/layout.module.scss'
import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
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
    
    const router = useRouter();
    const { id } = router.query;
    const [stationData, setStationData] = useState<Station[]>([]);

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
            const stationsDataList = Object.entries(station).map(([id, station]) => ({ id, ...station }));

            setStationData(stationsDataList);
        }
        getStation();
    }, [router.query.id, router.isReady]);

    console.log("stationData");
    console.log(stationData);
    return (
        <div className={styles.container}>
          {stationData.map((station) => {
            return (
              <div key={station.id}>
                {station.name_fi}
              </div>
            );
          })}
        </div>
      );
}