import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

// Fix for default marker icon
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface BusinessMapProps {
  ubicacion: {
    lat: number;
    lng: number;
  };
  nombre: string;
  direccion: string;
}

export const BusinessMap = ({ ubicacion, nombre, direccion }: BusinessMapProps) => {
  return (
    <MapContainer
      center={ubicacion}
      zoom={15}
      className="h-[400px] w-full rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={ubicacion} icon={defaultIcon}>
        <Popup>
          <div className="text-sm">
            <strong className="block mb-1">{nombre}</strong>
            <span>{direccion}</span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};