import { useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';

interface Train {
  trainNumber: string;
  location : any;
}

interface Trains {
  [id: string]: Omit<Train, 'id'> & { id?: string };
}

export const MarkerLayer = () => {
  const [trainData, setTrainData] = useState<Train[]>([]);

  useEffect(() => {
    async function fetchTrainData() {
      const res = await fetch('https://rata.digitraffic.fi/api/v1/train-locations/latest');
      const data = await res.json();
      const trains: Trains = data;

      const trainDataList = Object.entries(trains).map(([number, train]) => ({ number, ...train }));
      setTrainData(trainDataList);
    }

    const interval = setInterval(() => {
      fetchTrainData();
    }, 3000);

    return () => clearInterval(interval);
  });

  const pinIcon = new Icon({
    iconUrl: '/juna.png',
    iconSize: [55, 55],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });

  return (
    <>
      {trainData.map((train) => (
        <Marker key={train.trainNumber} position={[train.location.coordinates[1], train.location.coordinates[0]]} icon={pinIcon} />
      ))}
    </>
  );
};