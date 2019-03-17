import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

import SuggestionDialog from '../SuggestionDialog';


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


const useToggle = (state) => {
  const [value, setValue] = React.useState(state);
  const toggle = React.useMemo(() => {
    const fn = () => setValue(!value);
    fn.setTrue = () => setValue(true);
    fn.setFalse = () => setValue(false);
    return fn;
  }, [setValue]);
  return [value, toggle];
};


const FloatingActionButtons = ({ classes, refresh, isLoading }) => {
  const [isDialogOpen, toggle] = useToggle(false);
  return (
    <>
      <SuggestionDialog
        open={isDialogOpen}
        onClose={toggle.setFalse}
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
          onClick={toggle.setTrue}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};


export default withStyles(styles)(FloatingActionButtons);
