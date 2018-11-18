import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

import { getLunches } from './database';

import LunchList from './components/LunchList';
import LunchMap from './components/LunchMap';
import SuggestionDialog from './components/SuggestionDialog';


const debug = require('debug/dist/debug')('lunch:App');


const styles = theme => ({
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
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  floatingActionButtons: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: 0, // theme.spacing.unit * 2,
  },
  floatingActionButton: {
    marginRight: theme.spacing.unit * 2,
  },
  floatingActionButtonProgress: {
    position: 'absolute',
    top: -4,
    left: -4,
    zIndex: 1,
  },
});


class App extends Component {
  state = {
    addDialogOpen: false,
    isLoading: true,
    lunches: [],
    selectedLunchId: null,
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

  openAddDialog = () => {
    this.setState({ addDialogOpen: true });
  };

  closeAddDialog = () => {
    debug('closeAddDialog');
    this.setState({ addDialogOpen: false });
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
  }

  render() {
    const { classes, serviceWorkerUpdated } = this.props;
    const {
      addDialogOpen,
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
            onLunchClicked={this.onLunchClicked}
          >
            <Typography className={[classes.textShadow, classes.title].join(' ')} variant="h3" gutterBottom>
              Lunch
            </Typography>
            <LunchList lunches={lunches} isLoading={isLoading} isVisible={false} />
          </LunchMap>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={serviceWorkerUpdated}
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

        <React.Fragment>
          <SuggestionDialog
            open={addDialogOpen}
            onClose={this.closeAddDialog}
            onSubmit={this.submitSuggestion}
          />
          <div className={classes.floatingActionButtons}>
            <div style={{ display: 'inline-block' }}>
              <Button
                aria-label="Refresh"
                variant="fab"
                mini
                className={classes.floatingActionButton}
                onClick={this.refresh}
                disabled={isLoading}
              >
                <RefreshIcon />
              </Button>
              {isLoading && (
                <CircularProgress
                  size={48}
                  className={classes.floatingActionButtonProgress}
                />
              )}
            </div>
            <Button
              aria-label="Add"
              variant="fab"
              mini
              className={classes.floatingActionButton}
              onClick={this.openAddDialog}
            >
              <AddIcon />
            </Button>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
