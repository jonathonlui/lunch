import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import RefreshIcon from '@material-ui/icons/Refresh';


import { db } from './firebase';

import LunchList from './components/LunchList';


const styles = theme => ({
  App: {
    margin: '0 auto',
    padding: 2 * theme.spacing.unit,
    maxWidth: 600,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.875rem',
    color: '#212121',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lunches: [],
      showServiceWorkerUpdatedSnackbar: null,
    };
  }

  componentDidMount() {
    this.reloadLunches();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.serviceWorkerUpdated && state.showServiceWorkerUpdatedSnackbar === null) {
      return {
        showServiceWorkerUpdatedSnackbar: true,
      };
    }
    return null;
  }

  closeSnackbar = () => {
    this.setState({ showServiceWorkerUpdatedSnackbar: false });
  }

  reloadLunches = async () => {
    this.setState({ isLoading: true });
    const { docs } = await db
      .collection('lunches')
      .where('meals', '>', []) // Only get lunches that have meals
      .get();
    const lunches = docs.map(doc => ({ id: doc.id, ...doc.data() }));
    this.setState({ isLoading: false, lunches });
  };

  render() {
    const { classes } = this.props;
    const { isLoading, lunches, showServiceWorkerUpdatedSnackbar } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.App}>
          <Typography variant="display3" gutterBottom>
            Lunch
            <Button disabled={isLoading} onClick={this.reloadLunches}>
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

          <LunchList lunches={lunches} isLoading={isLoading} />

        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showServiceWorkerUpdatedSnackbar}
          message={(
            <span>
              App updated.
              {' '}
              <Button color="inherit" onClick={() => window.location.reload()}>
                Reload App
              </Button>
              <IconButton
                aria-label="Close"
                color="inherit"
                onClick={this.closeSnackbar}
              >
                <CloseIcon />
              </IconButton>
            </span>
          )}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
