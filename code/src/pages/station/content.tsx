// style imports
import styles from '../../styles/layout.module.scss'
//functional imports
import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'

interface Station { //defining interface for station (data)
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

export default function Content() { //this has the whole content of the single station view page

  const router = useRouter();
  const { id } = router.query; //get id from url {base_url}/station/{id}
  const [station, setStationData] = useState<Station>();
  const [fromCount, setFrom] = useState(0); //how many bike have started a trip from this station
  const [toCount, setTo] = useState(0); //how many bike have ended a trip to this station

  //hook to get stations data. This is only ran once when we load the page
  // Hook is tied to the router being ready and woan't run before it
  useEffect(() => { 

    async function getStation() {
      const url = 'http://localhost:3000/api/getStation'; //URL to fetch data from
      const postData = {
        method: "Post", //HTTP method
        headers: { "Content-Type": "application/json" }, //headers for the request
        body: JSON.stringify({
          id //page number to be sent in the request body
        }),
      }
      //fetching data from the URL
      const res = await fetch(url, postData);
      const data = await res.json();

      //converting data to station data list
      const stations: Station[] = data.results;
      if (stations) {
        const stationsDataList = Object.entries(stations).map(([id, station]) => ({ id, ...station }));
        //set first result as station variable
        setStationData(stationsDataList[0]);
      }
    }
    getStation();
  }, [router.query.id, router.isReady]);

  //call map component dynamically to stop serverside rendering
  //map has to be rendered in client side to work correctly
  const Map = dynamic(() => import('../../components/map'), {
    ssr: false
  });

  return (
    <div className={styles.wrap}>
      <table className={styles.styled_table}>
        <thead>
          {/* Table header */}
          <tr>
            {/* Print stations data */}
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
      {/* Map component. Gets coordinate data and shos the staion in the middle of the map */}
      <Map long={station?.x_cord} lat={station?.y_cord} />
    </div>
  );
}