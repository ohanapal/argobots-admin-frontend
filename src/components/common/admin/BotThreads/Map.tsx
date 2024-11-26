import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const RED_MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 24 36">
      <path fill="red" d="M12 0C7.029 0 3 4.029 3 9c0 5.25 9 17.25 9 17.25S21 14.25 21 9c0-4.971-4.029-9-9-9zm0 13.5c-2.485 0-4.5-2.015-4.5-4.5S9.515 4.5 12 4.5 16.5 6.515 16.5 9 14.485 13.5 12 13.5z"/>
    </svg>
`)}`

interface Props {
  lat: number
  lng: number
  address: string
  className?: string
}

const LeafletMap = ({ lat, lng, address, className }: Props) => {
  const BoatIcon = L.icon({
    iconUrl: RED_MARKER,
    iconSize: [30, 30],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
  })
  const position = [lat, lng] as LatLngExpression
  return (
    <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }} className={className}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker position={position} icon={BoatIcon}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  )
}

export default LeafletMap
