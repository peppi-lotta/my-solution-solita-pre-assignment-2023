import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import styles from '../../styles/layout.module.scss'
import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';

interface Coordinates {
    long: number;
    lat: number;
}

function Map() {

    const coordinates: Coordinates = {
        long: 60.4518,
        lat: 22.2666
    };
    const pinIcon = new Icon({
        iconUrl: '/location-pin.png',
        iconSize: [55, 55],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48],
    });

    return (
        <MapContainer className={styles.map} center={[60.4518, 22.2666]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className={styles.map_tiles}
            />
            <Marker position={[coordinates.long, coordinates.lat]} icon={pinIcon} />
        </MapContainer>
    );
}
export default Map