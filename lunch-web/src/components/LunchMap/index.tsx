import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Map from 'pigeon-maps';

import MapCenterAndZoomToFit from '../MapCenterAndZoomToFit';
import LunchMapOverlay from '../LunchMapOverlay';


const debug = require('debug/dist/debug')('lunch:LunchMap');


const toLatLng = ({ location }: Lunch): NumberPair => [location!.latitude, location!.longitude];


const styles = createStyles({
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
});


interface Props extends WithStyles<typeof styles> {
  lunches: Lunch[];
  isLoading: boolean;
  selectedLunchId?: string;
  onClick: (value: { latLng: NumberPair, pixel: NumberPair }) => void;
  onLunchClicked: (lunch: Lunch) => void;
}


// const openStreetMapProvider = (x, y, z) => {
//   const s = String.fromCharCode(97 + ((x + y + z) % 3));
//   return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
// };


class LunchMap extends React.Component<Props> {
  state = {
    zoom: 16,
    center: [34.048228325406804, -118.2508128624267],
    locations: [],
  };

  static getDerivedStateFromProps(props: Props) {
    const { lunches } = props;
    return {
      locations: lunches.map(({ location }: Lunch) => location),
    };
  }

  onBoundsChanged = ({
    bounds,
    center,
    zoom,
  }: {
    bounds: { ne: NumberPair, sw: NumberPair },
    center: NumberPair,
    zoom: number,
  }) => {
    debug('onBoundsChanged bounds: %o center: %o zoom: %o', bounds, center, zoom);
    this.setState({ center, zoom });
  }

  onLunchClicked = (lunch: Lunch) => {
    const {
      onLunchClicked,
    } = this.props;
    if (onLunchClicked) {
      onLunchClicked(lunch);
    }
  };

  onCenterZoom = ({ center, zoom }: { center: NumberPair, zoom: number }) => {
    this.setState({ center, zoom });
  }

  render() {
    const {
      lunches = [],
      classes,
      isLoading,
      children,
      selectedLunchId,
      onClick,
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
          onClick={onClick}
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
