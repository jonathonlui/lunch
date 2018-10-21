import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import withMobileDialog from '@material-ui/core/withMobileDialog';

import { addSuggestion } from '../../database';


const debug = require('debug/dist/debug')('lunch:SuggestionDialog');


const styles = {
  progressButtonWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: 'blue',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
};


class SuggestionDialog extends Component {
  state = {
    submitting: false,
    errors: {
      suggestion: false,
    },
    suggestion: '',
  };

  componentDidMount() {
    this.resetState();
  }

  resetState = () => {
    debug('resetState');
    this.setState({
      submitting: false,
      errors: {},
      suggestion: '',
    });
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = async () => {
    const {
      errors,
      submitting,
      ...formData
    } = this.state;

    this.setState({ submitting: true });
    if (!formData.suggestion || formData.suggestion.trim().length < 1) {
      const newErrors = {
        suggestion: 'Required',
      }
      debug('handleSubmit has errors', newErrors);
      this.setState({
        errors: newErrors,
        submitting: false,
      });
      return;
    }

    try {
      await addSuggestion(formData);
    } catch (err) {
      this.setState({ submitting: false });
      return;
    }

    debug('handleSubmit submitted suggestion. Closing dialog.');
    this.handleClose();
  }

  handleClose =() => {
    const { onClose } = this.props;
    this.resetState();
    onClose();
  }

  render() {
    const {
      classes,
      ...dialogProps
    } = this.props;
    const {
      suggestion,
      submitting,
      errors,
    } = this.state;
    return (
      <Dialog
        aria-labelledby="add-dialog-title"
        onClose={this.handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        {...dialogProps}
      >
        <DialogTitle id="add-dialog-title">Suggest a Lunch Meal</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              disabled={submitting}
              autoFocus
              margin="dense"
              name="suggestion"
              type="text"
              label="Suggestion"
              fullWidth
              multiline
              error={!!errors.suggestion}
              helperText={errors.suggestion}
              value={suggestion}
              onChange={this.handleInputChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={submitting}
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <div className={classes.progressButtonWrapper}>
            <Button
              disabled={submitting}
              onClick={this.handleSubmit}
              color="primary"
            >
              Send Suggestion
            </Button>
            {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(styles)(SuggestionDialog));
