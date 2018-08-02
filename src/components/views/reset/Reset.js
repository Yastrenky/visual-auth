import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import validate from '../../../assets/validate'
import Alert from '../alert/Alert'

import './reset.css';


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
    margin: theme.spacing.unit,
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


class Reset extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    copassword: '',
    alert: {
      show: false,
      title: '',
      text: ''
    }
  };

  onSubmit = event => {
    var password = this.state.password;
    var copassword = this.state.copassword;
    var alert = JSON.parse(JSON.stringify(this.state.alert));
    
    if (!validate.password(password)) {
      console.log("Invalid Password")
      alert.show = true;
      alert.title = 'Invalid Password';
      alert.text = 'Please enter a password with the valid parameters.'
      this.setState({ alert: alert })
    }
    else if (!validate.password(copassword) && password !== copassword) {
      console.log("Invalid Confirmed Password")
      alert.show = true;
      alert.title = 'Invalid Confirmed Password';
      alert.text = 'Please enter a confirmed password with the valid parameters.'
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

        <header className="Reset-header">
          <h1 className="Reset-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              input
            </Icon>
            Reset
           </h1>
        </header>

        <div className="auth-container">
          <div className="Reset-card auht-view">

            <TextField
              id="password"
              label="New password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin="normal"
              type="password"
              required={true}
            />
            <TextField
              id="copassword"
              label="Confirm new password"
              className={classes.textField}
              value={this.state.copassword}
              onChange={this.handleChange('copassword')}
              margin="normal"
              type="password"
              required={true}
            />
            <h5>Opss! I remember my password now. <Link to='/login'> Login </Link></h5>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
        <footer className="auth-footer">
          <h5>Copyright © 2018 : <a href="http://www.directbravo.com"> Y.Bravo </a></h5>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(Reset);
