import React, { Component } from 'react';

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import { getLunches } from './database';

import LunchList from './components/LunchList';
import LunchMap from './components/LunchMap';
import FloatingActionButtons from './components/FloatingActionButtons';


const debug = require('debug/dist/debug')('lunch:App');


const styles = (theme: Theme) => createStyles({
  App: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.875rem',
    color: '#212121',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    WebkitOverflowScrolling: 'touch',
  },
  title: {
    padding: theme.spacing.unit * 2,
  },
  textShadow: {
    textShadow: '25px 25px 15px #888',
  },
});


const ServiceWorkerUpdateSnackBar = ({ open }: { open: boolean }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={open}
    message={(
      <span>
        App updated.
      </span>
    )}
    action={(
      <Button color="inherit" onClick={() => window.location.reload()}>
        Reload App
      </Button>
    )}
  />
);


interface Props extends WithStyles<typeof styles> {
  serviceWorkerUpdated?: boolean;
}


class App extends Component<Props> {
  state: {
    isLoading: boolean;
    lunches: Lunch[];
    selectedLunchId?: string;
  } = {
    isLoading: true,
    lunches: [],
    selectedLunchId: undefined,
  };

  componentDidMount() {
    this.refresh();
  }

  refresh = async () => {
    debug('refresh');
    this.setState({ isLoading: true });
    const lunches = await getLunches();
    this.setState({ isLoading: false, lunches });
  };

  onClick = ({ latLng, pixel }: { latLng: any, pixel: any }) => {
    debug('onClick latLng: %o pixel: %o', latLng, pixel);
    this.setState({ selectedLunchId: null });
  }

  onLunchClicked = (lunch: Lunch) => {
    debug('onLunchClicked select', lunch);
    this.setState({ selectedLunchId: lunch.id });
  }

  render() {
    const { classes, serviceWorkerUpdated } = this.props;
    const {
      isLoading,
      lunches,
      selectedLunchId,
    } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.App}>
          <LunchMap
            lunches={lunches}
            isLoading={isLoading}
            selectedLunchId={selectedLunchId}
            onClick={this.onClick}
            onLunchClicked={this.onLunchClicked}
          >
            <Typography className={[classes.textShadow, classes.title].join(' ')} variant="h3" gutterBottom>
              Lunch
            </Typography>
            <LunchList lunches={lunches} isLoading={isLoading} isVisible={false} />
          </LunchMap>
        </div>

        <ServiceWorkerUpdateSnackBar open={!!serviceWorkerUpdated} />
        <FloatingActionButtons isLoading={isLoading} refresh={this.refresh} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
