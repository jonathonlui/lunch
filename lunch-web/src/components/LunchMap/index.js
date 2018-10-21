import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Map from 'pigeon-maps';
import MapOverlay from 'pigeon-overlay';

import MapCenterAndZoomToFit from '../MapCenterAndZoomToFit';


import { getPriceRangeString } from '../LunchCard';


const debug = require('debug/dist/debug')('lunch:LunchMap');


const toLatLng = ({ location: { latitude, longitude } }) => [latitude, longitude];


const LUNCH_OVERLAY_WIDTH = 125;


const styles = {
  lunchOverlay: {
    top: 0,
    left: -LUNCH_OVERLAY_WIDTH / 2,
    width: LUNCH_OVERLAY_WIDTH,
  },
  lunchOverlaySelected: {
    zIndex: 1,

    '& $lunchOverlayContents': {
      background: '#0570b0',
    },
  },
  lunchOverlayContents: {
    color: '#fff',
    background: 'rgba(54, 144, 192, 0.8)',
    padding: '2px 6px 4px',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    textAlign: 'left',
  },
};


// const openStreetMapProvider = (x, y, z) => {
//   const s = String.fromCharCode(97 + ((x + y + z) % 3));
//   return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
// };


const LunchOverlayContents = ({
  classes,
  onClick,
  lunch: { meals, name },
}) => (
  <button
    type="button"
    className={classes.lunchOverlayContents}
    onClick={onClick}
  >
    {getPriceRangeString(meals)}
    {' '}
    {name}
  </button>
);


class LunchMap extends React.Component {
  state = {
    selectedLunchId: null,
    zoom: 16,
    center: [34.048228325406804, -118.2508128624267],
    locations: [],
  };

  static getDerivedStateFromProps(props) {
    const { lunches } = props;
    return {
      locations: lunches.map(({ location }) => location),
    };
  }

  onBoundsChanged = ({ bounds, center, zoom }) => {
    debug('onBoundsChanged bounds: %o center: %o zoom: %o', bounds, center, zoom);
    this.setState({ center, zoom });
  }

  onClick = ({ latLng, pixel }) => {
    debug('onClick latLng: %o pixel: %o', latLng, pixel);
  }

  onLunchClicked = (lunch) => {
    const {
      selectedLunchId,
    } = this.state;

    if (selectedLunchId === lunch.id) {
      debug('onLunchClicked unselect', lunch);
      this.setState({ selectedLunchId: null });
    } else {
      debug('onLunchClicked select', lunch);
      this.setState({ selectedLunchId: lunch.id });
    }
  };

  onCenterZoom = ({ center, zoom }) => {
    this.setState({ center, zoom });
  }

  render() {
    const {
      lunches = [],
      classes,
      isLoading,
      children,
    } = this.props;
    const {
      locations,
      center,
      zoom,
      selectedLunchId,
    } = this.state;
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#ccc',
        }}
      >
        <Map
          center={center}
          zoom={zoom}
          onBoundsChanged={this.onBoundsChanged}
          onClick={this.onClick}
        >
          <MapCenterAndZoomToFit
            onCenterZoom={this.onCenterZoom}
            locations={locations}
          />
          {lunches.map(lunch => (
            <MapOverlay
              key={lunch.id}
              anchor={toLatLng(lunch)}
              className={[
                classes.lunchOverlay,
                lunch.id === selectedLunchId ? classes.lunchOverlaySelected : undefined,
              ].join(' ')}
            >
              <LunchOverlayContents
                classes={classes}
                lunch={lunch}
                onClick={() => this.onLunchClicked(lunch)}
              />
            </MapOverlay>
          ))}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          >
            {children}
          </div>
        </Map>
        {isLoading && (
          <LinearProgress
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 100,
              width: '100%',
            }}
          />
        )}
      </div>
    );
  }
}


export default withStyles(styles)(LunchMap);
