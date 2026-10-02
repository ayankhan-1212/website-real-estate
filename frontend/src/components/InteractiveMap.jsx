import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize2, ExternalLink } from 'lucide-react';

// Fix default Leaflet icon paths in React Vite
const customMarkerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const InteractiveMap = ({ properties, selectedProperty = null, height = '500px' }) => {
  // Center on selected property if provided, or default to central India (Mumbai/Pune)
  const defaultCenter = selectedProperty
    ? [selectedProperty.location.lat, selectedProperty.location.lng]
    : properties && properties.length > 0
    ? [properties[0].location.lat, properties[0].location.lng]
    : [19.076, 72.8777];

  const zoom = selectedProperty ? 14 : 6;

  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {properties.map((prop) => {
          if (!prop.location?.lat || !prop.location?.lng) return null;
          return (
            <Marker
              key={prop._id}
              position={[prop.location.lat, prop.location.lng]}
              icon={customMarkerIcon}
            >
              <Popup className="custom-popup">
                <div className="w-64 p-1">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-slate-800">
                    <img
                      src={
                        prop.images && prop.images[0]
                          ? prop.images[0]
                          : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={prop.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-slate-950/90 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-md">
                      {prop.priceDisplay}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 line-clamp-1 mb-1">
                    {prop.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mb-2">
                    {prop.location?.locality}, {prop.location?.city}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 py-1 border-t border-slate-800">
                    <div className="flex items-center gap-1">
                      <Bed className="w-3 h-3 text-emerald-400" />
                      <span>{prop.bhk} BHK</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 className="w-3 h-3 text-emerald-400" />
                      <span>{prop.areaSqFt} sq ft</span>
                    </div>
                    <Link
                      to={`/properties/${prop._id}`}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 font-semibold"
                    >
                      View <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
