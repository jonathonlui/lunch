import React from 'react';

import Map from 'pigeon-maps';
import MapOverlay from 'pigeon-overlay';


const toLatLng = ({ latitude, longitude }) => [latitude, longitude];


// const openStreetMapProvider = (x, y, z) => {
//   const s = String.fromCharCode(97 + ((x + y + z) % 3));
//   return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
// };


const LunchMap = ({
  lunches = [],
  showCenterOverlay = false,
  center,
  ...rest
}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    }}
  >
    <Map
      center={center}
      onClick={({ latLng }) => console.log(latLng)}
      {...rest}
    >
      {showCenterOverlay && (
        <MapOverlay anchor={center}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              background: 'rgba(0, 0, 255, 0.4)',
            }}
          />
        </MapOverlay>
      )}
      {lunches.filter(({ location }) => location).map(({ id, location, name }) => (
        <MapOverlay key={id} anchor={toLatLng(location)} offset={[0, 8]}>
          <div style={{ padding: 2, background: 'rgba(0, 250, 0, 0.3)' }}>
            {name}
          </div>
        </MapOverlay>
      ))}
    </Map>
  </div>
);


export default LunchMap;
