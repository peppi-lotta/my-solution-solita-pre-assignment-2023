import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import styles from '../../styles/layout.module.scss'
import { MarkerLayer } from './MarkerLayer';



function Map() {
    return (
            <MapContainer className={styles.map} center={[60.4518, 22.2666]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className={styles.map_tiles}
                />
                <MarkerLayer />
            </MapContainer>
    );
}
export default Map