import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Map from 'pigeon-maps';
import MapOverlay from 'pigeon-overlay';


import { getPriceRangeString } from '../LunchCard';


const debug = require('debug')('<LunchMap>');


const toLatLng = ({ location: { latitude, longitude } }) => [latitude, longitude];


const styles = {
  lunchOverlay: {
    top: -11,
  },
  lunchOverlaySelected: {
    zIndex: 1,

    '& $lunchOverlayContents': {
      background: '#0570b0',
      border: '1px solid #fff',
    },
  },
  lunchOverlayContents: {
    color: '#fff',
    background: '#3690c0',
    border: '1px solid #3690c0',
    padding: 4,
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
  };

  onBoundsChanged = ({ bounds, center, zoom }) => debug('onBoundsChanged', bounds, center, zoom);

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

  render() {
    const {
      lunches = [],
      center,
      classes,
      ...rest
    } = this.props;
    const {
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
        }}
      >
        <Map
          center={center}
          onBoundsChanged={this.onBoundsChanged}
          {...rest}
        >
          {lunches.filter(({ location }) => location).map(lunch => (
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
        </Map>
      </div>
    );
  }
}


export default withStyles(styles)(LunchMap);
