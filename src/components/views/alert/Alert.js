import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.resetAlert();
    if(this.props.data.title ==="User Eliminated"){
      // console.log("<<<<<<<<Alert>>>>>>")
    this.props.logOut()
    }
  };

  render() {
    // console.log(this.props)
    var data = this.props.data
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {data.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {data.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;