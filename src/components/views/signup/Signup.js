import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  }
});


class App extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    copassword: ''
  };

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };

  render() {
    console.log("state", this.state)
    const { classes } = this.props;
    return (
      <div>
        <header className="Signup-header">
          <h1 className="Signup-title">Signup</h1>
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
            />
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin="normal"
              type="password"
            />
            <TextField
              id="copassword"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.copassword}
              onChange={this.handleChange('copassword')}
              margin="normal"
              type="password"
            />
            <h5>Already have an account? <Link to='/login'> Login </Link></h5>
            <Button variant="contained" color="primary" className={classes.button}>
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
