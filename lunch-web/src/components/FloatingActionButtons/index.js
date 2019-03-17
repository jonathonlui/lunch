import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

import SuggestionDialog from '../SuggestionDialog';

const debug = require('debug/dist/debug')('lunch:FloatingActionButtons');


const styles = theme => ({
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


class FloatingActionButtons extends React.Component {
  state = {
    addDialogOpen: false,
  }

  openAddDialog = () => {
    this.setState({ addDialogOpen: true });
  };

  closeAddDialog = () => {
    debug('closeAddDialog');
    this.setState({ addDialogOpen: false });
  }

  render() {
    const {
      classes,
      refresh,
      isLoading,
    } = this.props;
    const {
      addDialogOpen,
    } = this.state;
    return (
      <React.Fragment>
        <SuggestionDialog
          open={addDialogOpen}
          onClose={this.closeAddDialog}
        />
        <div className={classes.floatingActionButtons}>
          <div style={{ display: 'inline-block' }}>
            <Fab
              aria-label="Refresh"
              variant="round"
              size="small"
              className={classes.floatingActionButton}
              onClick={refresh}
              disabled={isLoading}
            >
              <RefreshIcon />
            </Fab>
            {isLoading && (
              <CircularProgress
                size={48}
                className={classes.floatingActionButtonProgress}
              />
            )}
          </div>
          <Fab
            aria-label="Add"
            variant="round"
            size="small"
            className={classes.floatingActionButton}
            onClick={this.openAddDialog}
          >
            <AddIcon />
          </Fab>
        </div>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(FloatingActionButtons);
