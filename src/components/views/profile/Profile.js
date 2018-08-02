import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
// import validate from '../../../assets/validate'
import Alert from '../alert/Alert'

import './profile.css';


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


class Profile extends Component {

  state = {
    id: '',
    name: '',
    email: '',
    password: '',
    alert: {
      show: false,
      title: '',
      text: ''
    }
  };

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

        <header className="Profile-header">
          <h1 className="Profile-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              input
            </Icon>
            User Profile
           </h1>
        </header>

        <div className="auth-container">
          <div className="Profile-card auht-view">
            <h5>Id: {this.state.id}</h5>
            <h5>Name: {this.state.name}</h5>
            <h5>E-Mail: {this.state.email}</h5>
            <h5>ENCRIPTED-Password: {this.state.password}</h5>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.props.logOut}
            >
              Logout
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

export default withStyles(styles)(Profile);
