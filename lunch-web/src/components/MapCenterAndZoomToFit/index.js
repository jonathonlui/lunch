import React from 'react';

import geolib from 'geolib';


const debug = require('debug/dist/debug')('lunch:MapCenterAndZoomToFit');


export default class MapCenterAndZoomToFit extends React.Component {
  constructor(props) {
    super(props);
    this.selfRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate(prevProps) {
    const { locations } = this.props;
    if (prevProps.locations.length !== locations.length) {
      this.onResize();
    }
  }

  isInside = (center, zoom) => ({ latitude, longitude }) => {
    const { latLngToPixel } = this.props;
    const width = this.selfRef.current.offsetWidth;
    const height = this.selfRef.current.offsetHeight;
    const [x, y] = latLngToPixel([latitude, longitude], center, zoom);
    return x >= 0 && x <= width && y >= 0 && y <= height;
  };

  onResize = () => {
    // <Map> passes latLngToPixel helper function to its children
    const { onCenterZoom, locations } = this.props;
    if (!locations || locations.length < 1) {
      return;
    }
    // Conver tto array of plain lat/lng objects because geolib doesn't seem
    // to work with GeoPoint objects ven though GeoPoints have
    // latitude and longitude properties.
    // https://github.com/manuelbieh/Geolib/issues/62
    // https://github.com/manuelbieh/Geolib/pull/63
    const locationsAsPlainObjects = locations
      .map(({ latitude, longitude }) => ({ latitude, longitude }));
    const { latitude, longitude } = geolib.getCenter(locationsAsPlainObjects);
    const center = [latitude, longitude];
    // Zoom out until all elements are visible in map
    let zoom = 18;
    while (!locations.every(this.isInside(center, zoom)) && zoom > 1) {
      zoom -= 1;
    }
    debug('CenterAndZoomToFit.onResize: center: %o zoom: %o', center, zoom);
    onCenterZoom({ center, zoom });
  }

  render() {
    return (
      <div
        ref={this.selfRef}
        style={{ width: '100%', height: '100%', zIndex: -100 }}
      />
    );
  }
}
