import styles from '../../styles/layout.module.scss'
import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import { getJSDocAugmentsTag } from 'typescript';

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
interface Coordinates {
  long: number;
  lat: number;
}

export default function Content() {

  const router = useRouter();
  const { id } = router.query;
  const [station, setStationData] = useState<Station>();
  const [fromCount, setFrom] = useState(0);
  const [toCount, setTo] = useState(0);

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

      const stations: Station[] = data.results;
      if (stations) {
        const stationsDataList = Object.entries(stations).map(([id, station]) => ({ id, ...station }));
        setStationData(stationsDataList[0]);
      }
    }
    async function getCounts() {
      const url = 'http://localhost:3000/api/getCount';
      const postData = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: 'trips',
          attribute: 'start_location_id',
          value: id,
        }),
      }
      const res = await fetch(url, postData);
      const data = await res.json();
      const from = data.results;
      if (from) {
        const stationsDataList = Object.entries(from).map(([id, f]) => ({ id, ...f }));
        setFrom(from[0].count);
      }
    }
    
    getStation();
    getCounts();
  }, [router.query.id, router.isReady]);

  const Map = dynamic(() => import('../../components/map'), {
    ssr: false
  });

  return (
    <div className={styles.wrap}>
      <table className={styles.styled_table}>
        <thead>
          <tr>
            <th>Aseman tiedot:</th>
            <th>{station?.name_fi}/{station?.name_sw}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Osoite (Suomi)</td>
            <td>{station?.address_fi}</td>
          </tr>
          <tr>
            <td>Osoite (Ruotsi)</td>
            <td>{station?.address_sw}</td>
          </tr>
          <tr>
            <td>Kaapasiteetti</td>
            <td>{station?.capacity}</td>
          </tr>
          <tr>
            <td>Matkoja aloitettu täältä yhteensä</td>
            <td>{fromCount}</td>
          </tr>
          <tr>
            <td>Matkoja lopetettu tänne yhteensä</td>
            <td>{toCount}</td>
          </tr>
        </tbody>
      </table>
      {station?.name_fi}
      <Map long={station?.x_cord} lat={station?.y_cord} />
    </div>
  );
}