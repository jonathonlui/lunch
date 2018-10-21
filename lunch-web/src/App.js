import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

import { PADDING_TOP } from './constants';

import { getLunches } from './database';

import LunchList from './components/LunchList';
import LunchMap from './components/LunchMap';
import SuggestionDialog from './components/SuggestionDialog';


const debug = require('debug/dist/debug')('lunch:App');


const styles = theme => ({
  App: {
    padding: 1 * theme.spacing.unit,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.875rem',
    color: '#212121',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  floatingActionButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});


const WrappedMap = props => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: 0,
      paddingTop: PADDING_TOP['16x9'],
    }}
  >
    <LunchMap {...props} />
  </div>
);


class App extends Component {
  state = {
    addDialogOpen: false,
    isLoading: true,
    lunches: [],
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

  render() {
    const { classes, serviceWorkerUpdated } = this.props;
    const { addDialogOpen, isLoading, lunches } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.App}>
          <Typography variant="display3" gutterBottom>
            Lunch
            <Button disabled={isLoading} onClick={this.refresh}>
              {isLoading
                ? <CircularProgress size={24} />
                : (
                  <React.Fragment>
                    <RefreshIcon className={classes.leftIcon} />
                    Refresh
                  </React.Fragment>
                )
              }
            </Button>
          </Typography>

          <WrappedMap lunches={lunches} isLoading={isLoading} />
          <LunchList lunches={lunches} isLoading={isLoading} />
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
          <Button
            aria-label="Add"
            variant="fab"
            mini
            className={classes.floatingActionButton}
          >
            <AddIcon onClick={this.openAddDialog} />
          </Button>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
