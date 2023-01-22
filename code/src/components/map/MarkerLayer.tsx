import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';

interface Coordinates {
  long: number;
  lat: number;
}

export const MarkerLayer = () => {

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
    <>
      <Marker position={[60.4518, 22.2666]} icon={pinIcon} />
    </>
  );
};