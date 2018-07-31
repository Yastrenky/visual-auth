import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import validate from '../../../assets/validate'
import Alert from '../alert/Alert'

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
    name: '',
    email: '',
    password: '',
    copassword: '',
    alert:{
      show: false,
      title:'',
      text: ''
    }
  };

  onSubmit = event => {
    var name = this.state.name;
    var email = this.state.email;
    var password = this.state.password;
    var copassword = this.state.copassword;

    if (!validate.name(name)) {
      console.log("Invalid Name")
    }
    else if (!validate.email(email)) {
      console.log("Invalid Email")
    }
    else if (!validate.password(password)) {
      console.log("Invalid Password")
    }
    else if (!validate.password(copassword) && password !== copassword) {
      console.log("Invalid Confirmed Password")
    }
    else {
      console.log("Todo ok")
    }
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };

  render() {
    // console.log("state", this.state)
    const { classes } = this.props;
    return (
      <div>
        <Alert />
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
