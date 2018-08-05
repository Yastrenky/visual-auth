import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import validate from '../../../assets/validate';
import Alert from '../alert/Alert';
import server, {secure} from '../../../config/config';
import Cryptr from 'cryptr';

import './login.css';


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
    marginTop: 40,
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


class Login extends Component {

  state = {
    email: 'ybramos91@gmail.com',
    password: 'Zxcvbn95',// only for testing
    alert: {
      show: false,
      title: '',
      text: ''
    }
  };

  onSubmit = event => {
    var email = this.state.email;
    var password = this.state.password;
    var alert = JSON.parse(JSON.stringify(this.state.alert));

    if (!validate.email(email)) {
      // console.log("Invalid Email")
      alert.show = true;
      alert.title = 'Invalid Email';
      alert.text = 'Please enter a email with the valid parameters.'
      this.setState({ alert: alert })
    }

    else if (!validate.password(password)) {
      // console.log("Invalid Password")
      alert.show = true;
      alert.title = 'Invalid Password';
      alert.text = 'Please enter a password with the valid parameters.'
      this.setState({ alert: alert })
    }
    else {
      const cryptr = new Cryptr(secure);
      fetch(server + '/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          email: this.state.email,
          password: cryptr.encrypt(this.state.password)
        }),
      }).then(response => response.json())
        .then(response => {
          // console.log('Request success: ', response);
          if (response.success) {
            this.props.logIn(response.user)
          }
          else {
            alert.show = true;
            alert.title = response.title;
            alert.text = response.message
            this.setState({ alert: alert })
          }
        })
        .catch(
          (error) => {
            alert.show = true;
            alert.title = 'Connection lost';
            alert.text = "Server connection lost. Please contact your service provider.";
            this.setState({ alert: alert })
          })
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
    // console.log("state", this.state)

    const { classes } = this.props;
    const alert = this.state.alert.show;

    return (
      <div>
        {alert ? <Alert data={this.state.alert} resetAlert={this.resetAlert} /> : null}

        <header className="Login-header">
          <h1 className="Login-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              input
            </Icon>
            Login
           </h1>
        </header>

        <div className="auth-container">
          <div className="Login-card auht-view">
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
              required={true}
            />
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin="normal"
              type="password"
              required={true}
            />
            <h5><Link to='/forgot'> Forgot Password?  </Link></h5>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onSubmit}
            >
              Submit
            </Button>
            <hr></hr>
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

export default withStyles(styles)(Login);
