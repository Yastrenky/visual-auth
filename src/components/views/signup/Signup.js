import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './signup.css';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
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
        <div className="Signup auht-view">
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="name"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <TextField
            id="name"
            label="Password"
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
          />
          <TextField
            id="name"
            label="Confirm Password"
            className={classes.textField}
            value={this.state.copassword}
            onChange={this.handleChange('copassword')}
            margin="normal"
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
