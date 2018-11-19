import React from 'react';
import MapOverlay from 'pigeon-overlay';
import { withStyles } from '@material-ui/core/styles';

import { getPriceRangeString } from '../LunchCard';


const LUNCH_OVERLAY_WIDTH = 125;

const styles = {
  lunchOverlay: {
    top: 0,
    left: -LUNCH_OVERLAY_WIDTH / 2,
    maxWidth: LUNCH_OVERLAY_WIDTH,
  },
  lunchOverlaySelected: {
    zIndex: 1,
    left: -LUNCH_OVERLAY_WIDTH,
    maxWidth: LUNCH_OVERLAY_WIDTH * 2,

    '& $lunchOverlayContents': {
      background: '#0570b0',
    },
    '& $lunchOverlayTitle': {
      fontWeight: 'bold',
    },
  },
  lunchOverlayContents: {
    color: '#fff',
    background: 'rgba(54, 144, 192, 0.8)',
    padding: '2px 8px 4px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    textAlign: 'left',
  },
  lunchOverlayTitle: {
  },
  moreInfo: {
    paddingBottom: 6,
  },
  moreInfoAddress: {
    paddingTop: 12,
  },
  moreInfoMeals: {
    paddingTop: 12,
  },
  moreInfoDescriptin: {
    paddingTop: 12,
  },
};


const MoreInfo = ({ classes, show, lunch }) => (show ? (
  <div className={classes.moreInfo}>
    {lunch.address && (
      <div className={classes.moreInfoAddress}>
        {lunch.address}
      </div>
    )}
    {lunch.description && (
      <div className={classes.moreInfoDescriptin}>
        {lunch.description}
      </div>
    )}
  </div>
) : null);


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
          <div className={classes.lunchOverlayTitle}>
            {getPriceRangeString(lunch.meals)}
            {' '}
            {lunch.name}
          </div>
          <MoreInfo classes={classes} show={selected} lunch={lunch} />
        </button>
      </MapOverlay>
    );
  }
}


export default withStyles(styles)(LunchMapOverlay);
