import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Map from 'pigeon-maps';

import MapCenterAndZoomToFit from '../MapCenterAndZoomToFit';
import LunchMapOverlay from '../LunchMapOverlay';


const debug = require('debug/dist/debug')('lunch:LunchMap');


const toLatLng = ({ location: { latitude, longitude } }) => [latitude, longitude];


const styles = {
  LunchMap: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
  LunchMapProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 100,
    width: '100%',
  },
  LunchMapChildrenContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
};


// const openStreetMapProvider = (x, y, z) => {
//   const s = String.fromCharCode(97 + ((x + y + z) % 3));
//   return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
// };


class LunchMap extends React.Component {
  state = {
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
      onLunchClicked,
    } = this.props;
    if (onLunchClicked) {
      onLunchClicked(lunch);
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
      selectedLunchId,
    } = this.props;
    const {
      locations,
      center,
      zoom,
    } = this.state;
    return (
      <div className={classes.LunchMap}>
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
            <LunchMapOverlay
              key={lunch.id}
              anchor={toLatLng(lunch)}
              lunch={lunch}
              selected={lunch.id === selectedLunchId}
              onClick={this.onLunchClicked}
            />
          ))}
          <div className={classes.LunchMapChildrenContainer}>
            {children}
          </div>
        </Map>
        {isLoading && (
          <LinearProgress className={classes.LunchMapProgress} />
        )}
      </div>
    );
  }
}


export default withStyles(styles)(LunchMap);
