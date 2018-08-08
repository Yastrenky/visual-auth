import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import validate from '../../../assets/validate'
import Alert from '../alert/Alert';
import server,{recaptcha} from '../../../config';
import Recaptcha from 'react-recaptcha';

import './signup.css';


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


class App extends Component {

  state = {
    name: 'Yastrenky',
    email: 'ybramos91@gmail.com',
    password: 'Zxcvbn95',
    copassword: 'Zxcvbn95',
    alert: {
      show: false,
      title: '',
      text: ''
    }
  };

  onSubmit = event => {
    var name = this.state.name;
    var email = this.state.email;
    var password = this.state.password;
    var copassword = this.state.copassword;
    var alert = JSON.parse(JSON.stringify(this.state.alert));

    if (!validate.name(name)) {
      // console.log("Invalid Name")
      alert.show = true;
      alert.title = 'Invalid Name';
      alert.text = 'Please enter a name with the valid parameters.'
      this.setState({ alert: alert })
    }
    else if (!validate.email(email)) {
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
    else if (!validate.password(copassword) && password !== copassword) {
      // console.log("Invalid Confirmed Password")
      alert.show = true;
      alert.title = 'Invalid Confirmed Password';
      alert.text = 'Please enter a confirmed password with the valid parameters.'
      this.setState({ alert: alert })
    }
    else if (!this.state.recaptcha) {
      // console.log("Invalid Password")
      this.resetRecaptcha();
      alert.show = true;
      alert.title = 'Bot verification fail';
      alert.text = 'Access to login denied by google verification.'
      this.setState({ alert: alert })
    }
    else {
      fetch(server + '/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }),
      }).then(response => response.json())
        .then(response => {
          console.log('Request:', response);
          if (response.success) {
            alert.show = true;
            alert.title = response.title;
            alert.text = response.message
            this.setState({ alert: alert })
          }
          else {
            alert.show = true;
            alert.title = response.title;
            alert.text = response.message
            this.setState({ alert: alert })
          }

        })
        .catch((error) => {
          alert.show = true;
          alert.title = 'Request failure';
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

  callback = () => {
    console.log('Done!!!!');
  };

  verifyCallback = (response) => {
    this.setState({ recaptcha: response })
  };

  resetRecaptcha = () => {
    this.recaptchaInstance.reset();
  };
  render() {
    // console.log(this.state)

    const { classes } = this.props;
    const alert = this.state.alert.show;

    return (
      <div>
        {alert ? <Alert data={this.state.alert} resetAlert={this.resetAlert} /> : null}

        <header className="Signup-header">
          <h1 className="Signup-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              input
            </Icon>
            Signup
           </h1>
        </header>

        <div className="auth-container">
          <div className="Signup-card auht-view">
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              required={true}
            />
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
            <TextField
              id="copassword"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.copassword}
              onChange={this.handleChange('copassword')}
              margin="normal"
              type="password"
              required={true}
            />
            <Recaptcha
              ref={e => this.recaptchaInstance = e}
              sitekey={recaptcha}
              render="explicit"
              onloadCallback={this.callback}
              verifyCallback={this.verifyCallback}
            />

            <h5>Already have an account? <Link to='/login'> Login </Link></h5>
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

export default withStyles(styles)(App);
