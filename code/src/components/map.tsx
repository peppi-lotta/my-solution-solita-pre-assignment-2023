import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import styles from '../styles/layout.module.scss'
import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';
import React from 'react';

interface Coordinates {
    long: number;
    lat: number;
}

const Map: React.FC<Coordinates> = ({ long, lat }) => {

    const pinIcon = new Icon({
        iconUrl: '/location-pin.png',
        iconSize: [55, 55],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48],
    });
    console.log(long);
    console.log(lat);

    return (
        <MapContainer className={styles.map} center={[lat, long]} zoom={16} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className={styles.map_tiles}
            />
            <Marker position={[lat, long]} icon={pinIcon} />
        </MapContainer>
    );

}
export default Map;