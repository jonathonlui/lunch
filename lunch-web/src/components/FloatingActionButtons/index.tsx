import React from 'react';
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

import SuggestionDialog from '../SuggestionDialog';


const styles = (theme: Theme) => createStyles({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  floatingActionButtons: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: 0, // theme.spacing(2),
  },
  floatingActionButton: {
    marginRight: theme.spacing(2),
  },
  floatingActionButtonProgress: {
    position: 'absolute',
    top: -4,
    left: -4,
    zIndex: 1,
  },
});


interface ToggleFunction {
  (): void;
  setFalse: () => void;
  setTrue: () => void;
}

type UseToggle = (state: boolean) => [
  boolean,
  ToggleFunction,
];

const useToggle: UseToggle = (state = false) => {
  const [value, setValue] = React.useState(state);
  const toggle = React.useMemo(() => {
    const fn = () => setValue(v => !v);
    fn.setTrue = () => setValue(true);
    fn.setFalse = () => setValue(false);
    return fn;
  }, [setValue]);
  return [value, toggle];
};


interface Props extends WithStyles<typeof styles> {
  refresh: () => void;
  isLoading: boolean;
}


const FloatingActionButtons = ({ classes, refresh, isLoading }: Props) => {
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
