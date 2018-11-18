import React from 'react';
import MapOverlay from 'pigeon-overlay';
import { withStyles } from '@material-ui/core/styles';

import { getPriceRangeString } from '../LunchCard';


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


class LunchMapOverlay extends React.Component {
  onClick = () => {
    const {
      lunch,
      onClick,
    } = this.props;
    return onClick && onClick(lunch);
  }

  render() {
    const {
      classes,
      lunch,
      selected,
      ...rest
    } = this.props;
    return (
      <MapOverlay
        className={[
          classes.lunchOverlay,
          selected ? classes.lunchOverlaySelected : undefined,
        ].join(' ')}
        {...rest}
      >
        <button
          type="button"
          className={classes.lunchOverlayContents}
          onClick={this.onClick}
        >
          {getPriceRangeString(lunch.meals)}
          {' '}
          {lunch.name}
        </button>
      </MapOverlay>
    );
  }
}


export default withStyles(styles)(LunchMapOverlay);
