import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import validate from '../../../assets/validate'
import Alert from '../alert/Alert'

import './forgot.css';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 320,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: 15,
    width: 100,
  },
  input: {
    display: 'none',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
});


class Forgot extends Component {

  state = {
    email: '',
    alert: {
      show: false,
      title: '',
      text: ''
    }
  };

  onSubmit = event => {
    var email = this.state.email;
    var alert = JSON.parse(JSON.stringify(this.state.alert));

    if (!validate.email(email)) {
      console.log("Invalid Email")
      alert.show = true;
      alert.title = 'Invalid Email';
      alert.text = 'Please enter a email with the valid parameters.'
      this.setState({ alert: alert })
    }
    else {
      console.log("Todo ok")

    }
  }

  resetAlert = () => {
    var alert = JSON.parse(JSON.stringify(this.state.alert));
    alert = {
      show: false,
      title: '',
      text: ''
    }
    this.setState({ alert: alert })
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };

  render() {
    console.log("state", this.state)

    const { classes } = this.props;
    const alert = this.state.alert.show;

    return (
      <div>
        {alert ? <Alert data={this.state.alert} resetAlert={this.resetAlert} /> : null}

        <header className="Forgot-header">
          <h1 className="Forgot-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              lock
            </Icon>
            Forgot Password
           </h1>
        </header>

        <div className="auth-container">
          <div className="Forgot-card auht-view">
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
              required={true}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onSubmit}
            >
              Submit
            </Button>
            <hr></hr>
            <h5>Opss! I remember my password now. <Link to='/login'> Login </Link></h5>
            <h5>Don't have an account? <Link to='/signup'> Signup </Link></h5>
          </div>
        </div>
        <footer className="auth-footer">
          <h5>Copyright © 2018 : <a href="http://www.directbravo.com"> Y.Bravo </a></h5>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(Forgot);
