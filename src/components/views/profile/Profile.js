import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import validate from '../../../assets/validate';
import Alert from '../alert/Alert';
import server from '../../../config';
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


class Profile extends Component {
  constructor(props) {
    super(props);
    var data = this.props.data;

    this.state = {
      id: '' || data.id,
      name: '' || data.name,
      email: '' || data.email,
      password: '' || data.password,
      currentpassword: '',
      newpassword: '',
      copassword: '',
      alert: {
        show: false,
        title: '',
        text: ''
      },
    };
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

  changePassword = () => {

    var password = this.state.currentpassword;
    var newpassword = this.state.newpassword;
    var copassword = this.state.copassword;
    var alert = JSON.parse(JSON.stringify(this.state.alert));


    if (!validate.password(password)) {
      // console.log("Invalid Password")
      alert.show = true;
      alert.title = 'Invalid Password';
      alert.text = 'Please enter a password with the valid parameters.'
      this.setState({ alert: alert })
    }
    // else if (!validate.password(newpassword)) {
    //   // console.log("Invalid Confirmed Password")
    //   alert.show = true;
    //   alert.title = 'Invalid Confirmed Password';
    //   alert.text = 'Please enter a confirmed password with the valid parameters.'
    //   this.setState({ alert: alert })
    // }
    // else if (!validate.password(copassword) && newpassword !== copassword) {
    //   // console.log("Invalid Confirmed Password")
    //   alert.show = true;
    //   alert.title = 'Invalid Confirmed Password';
    //   alert.text = 'Please enter a confirmed password with the valid parameters.'
    //   this.setState({ alert: alert })
    // }
    else {
      fetch(server + '/changepassword', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.id,
          password: this.state.newpassword
        }),
        credentials: "include",
      }).then(response => response.json())
        .then(response => {
          alert.show = true;
          alert.title = response.title;
          alert.text = response.message
          this.setState({ alert: alert })
        })
        .catch(
          (error) => {
            alert.show = true;
            alert.title = 'Connection lost';
            alert.text = "Server connection lost. Please contact your service provider." + error;
            this.setState({ alert: alert })
          });
    }
  }


  deleteUser = () => {
    var alert = JSON.parse(JSON.stringify(this.state.alert));
    fetch(server + '/deleteuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
    }).then(response => response.json())
      .then(response => {
        alert.show = true;
        alert.title = response.title;
        alert.text = response.message
        this.setState({ alert: alert })
      })
      .catch(
        (error) => {
          alert.show = true;
          alert.title = 'Connection lost';
          alert.text = "Server connection lost. Please contact your service provider.";
          this.setState({ alert: alert })
        });
  }


  componentDidMount() {

  }

  render() {
    console.log("state", this.state)

    const { classes } = this.props;
    const alert = this.state.alert.show;

    return (
      <div>
        {alert ? <Alert data={this.state.alert} resetAlert={this.resetAlert} /> : null}

        <header className="Profile-header">
          <h1 className="Profile-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              account_box
            </Icon>
            User Profile
           </h1>
        </header>

        <div className="auth-container">
          <div className="Profile-card auht-view">
            <div>
              <div>
                <h5>Id: {this.state.id}</h5>
                <h5>Name: {this.state.name}</h5>
                <h5>Email: {this.state.email}</h5>
              </div>

              <Button
                variant="contained"
                className={classes.button}
                onClick={this.props.logOut}
              >
                Logout
              </Button>
              <hr></hr>

              <h5>Change password</h5>
              <TextField
                id="password"
                label="Current password"
                className={classes.textField}
                value={this.state.currentpassword}
                onChange={this.handleChange('currentpassword')}
                margin="normal"
                type="password"
                required={true}
              />
              <TextField
                id="newpassword"
                label="New password"
                className={classes.textField}
                value={this.state.newpassword}
                onChange={this.handleChange('newpassword')}
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
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.changePassword}
              >
                Change
              </Button>

              <div>
                <hr></hr>
                <h5>Delete your account permanently</h5>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={this.deleteUser}
                >
                  Delete
              </Button>
              </div>

            </div>
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
