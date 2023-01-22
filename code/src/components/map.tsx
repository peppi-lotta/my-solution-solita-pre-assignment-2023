//imports
import styles from '../styles/layout.module.scss'; 
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet'; 
import { Icon } from 'leaflet'; 
import { Marker } from 'react-leaflet';
import React from 'react';

interface Coordinates { //defining an interface for coordinates
    long: number;
    lat: number;
}

const Map: React.FC<Coordinates> = ({ long, lat }) => { //Map functional component that accept Coordinates as props

    const pinIcon = new Icon({ // creating a new icon object using leaflet's Icon constructor
        iconUrl: '/location-pin.png', // specifying location of the icon
        iconSize: [55, 55], // size of the icon
        iconAnchor: [24, 48], // position of the icon
    });

    return (
        <MapContainer className={styles.map} center={[lat, long]} zoom={16} scrollWheelZoom={false}>
            <TileLayer //rendering a TileLayer component
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, long]} icon={pinIcon} /> {/* rendering a Marker component */}
        </MapContainer>
    );

}
export default Map;