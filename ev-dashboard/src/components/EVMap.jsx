import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useInView } from 'react-intersection-observer';

const EVMap = ({ data }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,  // This ensures that the map only loads once it's in view
    threshold: 0.5, // The percentage of the element visible before triggering
  });

  if (!data || data.length === 0) {
    return <div>Loading...</div>; // Handle the case when data is not available
  }

  // Proceed with rendering the map only when it's in view
  return (
    <div ref={ref}>
      {inView && (
        <MapContainer center={[47.6062, -122.3321]} zoom={10} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((d, index) => {
            const [lng, lat] = d["Vehicle Location"]
              .replace("POINT (", "")
              .replace(")", "")
              .split(" ")
              .map(Number);
            return (
              <Marker key={index} position={[lat, lng]}>
                <Popup>
                  {d.Make} {d.Model}, {d["Model Year"]}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer >
      )}
    </div>
  );
};

export default EVMap;
