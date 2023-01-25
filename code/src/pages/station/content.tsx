// style imports
import styles from '@/styles/layout.module.scss';
//functional imports
import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
//componen imports 
import Trips from '@/components/trips';
import Popular from '@/components/popular';

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

interface Options {
  start: string;
  end: string;
}

export default function Content() { //this has the whole content of the single station view page

  const router = useRouter();
  const { id } = router.query; //get id from url {base_url}/station/{id}
  const [station, setStationData] = useState<Station>();
  const [from_count, setFrom] = useState(0); //how many bike have started a trip from this station
  const [to_count, setTo] = useState(0); //how many bike have ended a trip to this station
  const i = Number(id);

  const options = {
    start: 'start_location_id',
    end: 'end_location_id',
  }

  //useEffect hook to fetch count trip starting from this station. 
  //This hook is tied to from_count (and also rourer) and should only be called once at page load
  useEffect(() => {
    async function getCount() {
      const url = process.env.NEXT_PUBLIC_BASE_URL + 'api/getCount'; //URL to fetch data from
      const postData = {
        method: "Post", //HTTP method
        headers: { "Content-Type": "application/json" }, //headers for the request
        body: JSON.stringify({
          table: 'trips', //getCount of all rows in stations table
          attribute: 'start_location_id',
          value: id
        }),
      }
      //fetching data from the URL
      const res = await fetch(url, postData);
      const data = await res.json();
      setFrom(data.results[0].count)
    }
    getCount();
  }, [from_count, router.query.id, router.isReady]);

  //useEffect hook to fetch count trip starting from this station. 
  //This hook is tied to from_count (and also rourer) and should only be called once at page load
  useEffect(() => {
    async function getCount() {
      const url = process.env.NEXT_PUBLIC_BASE_URL + 'api/getCount'; //URL to fetch data from
      const postData = {
        method: "Post", //HTTP method
        headers: { "Content-Type": "application/json" }, //headers for the request
        body: JSON.stringify({
          table: 'trips', //getCount of all rows in stations table
          attribute: 'end_location_id',
          value: id
        }),
      }
      //fetching data from the URL
      const res = await fetch(url, postData);
      const data = await res.json();
      setTo(data.results[0].count)
    }
    getCount();
  }, [to_count, router.query.id, router.isReady]);

  //hook to get stations data. This is only ran once when we load the page
  // Hook is tied to the router being ready and woan't run before it
  useEffect(() => {

    async function getStation() {
      const url = process.env.NEXT_PUBLIC_BASE_URL + 'api/getStation'; //URL to fetch data from
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
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.map_container}>
          {/* Map component. Gets coordinate data and shos the staion in the middle of the map */}
          {(station?.x_cord && station?.y_cord) &&
            <>
              <Map long={station?.x_cord} lat={station?.y_cord} />
            </>
          }
        </div>
        <table className={styles.tiny_table}>
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
              <td>{from_count}</td>
            </tr>
            <tr>
              <td>Matkoja lopetettu tänne yhteensä</td>
              <td>{to_count}</td>
            </tr>
          </tbody>
        </table>
        {(i) &&
            <>
              <Popular id={i} type='start' />
              <Popular id={i} type='end' />
            </>
          }
        <div className={styles.trips}>
          {(i) &&
            <>
              <h2>Täältä lähteneet matkat</h2>
              <Trips id={i} attribute={options.start} />
              <h2>Tänne päättyneet matkat</h2>
              <Trips id={i} attribute={options.end} />
            </>
          }
        </div>
      </div>
    </div>
  );
}