import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';
import validate from '../../../assets/validate';
import { connect } from "react-redux";
import { USERS, ALERTS, PROFILE } from '../../../actions';
import server from '../../../config';
import {  NavMenu, Footer } from '../';
import './profile.css';
import styles from '../../../styles'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpassword: '',
      newpassword: '',
      copassword: '',
    };
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };

  changePassword = () => {
    const { currentpassword, newpassword, copassword } = this.state
    const user_id = this.props.users.id

    if (!validate.password(currentpassword)) {
      this.props.showAlert('Invalid Password', 'Please enter a  password with the valid parameters.')
    }
    else if (!validate.password(newpassword)) {
      // console.log("Invalid Confirmed Password")
      this.props.showAlert('Invalid new password', 'Please enter a new password with the valid parameters.')
    }
    else if (newpassword !== copassword) {
      // console.log("Invalid Confirmed Password")
      this.props.showAlert('Invalid confirmed password', 'Please enter a confirmed password with the valid parameters.')
    }
    else {
      this.props.updatePsw({ user_id, currentpassword, newpassword }, (show, title, text) => {
        if (show) {
          this.props.showAlert(title, text)
        }
      })
    }
  }


  deleteUser = () => {
    this.props.delete((show, title, text, action) => {
      if (show) {
        this.props.showAlert(title, text)
      }
    })
  }

  imageChanger = (event) => {
    this.props.updateProfileImage(event, (show, title, text) => {
      if (show) {
        this.props.showAlert(title, text)
      }
    })
  }

  componentDidMount () {
    this.props.loadProfile((show, title, text) => {
      if (show) {
        this.props.showAlert(title, text)
      }
    })
   }

  render () {
    const { classes } = this.props;
    return (
      <div className='view-container'>
        <NavMenu variant="contained" />
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
              <div className="profile-card-info">
                <div>

                  <div className="profile-image-container">
                    <CardMedia
                      className={classes.media}
                      image={
                        this.props.users.imageName ?
                          server + '/uploads/users/' + this.props.users.id + '/' + this.props.users.imageName
                          :
                          server + '/uploads/users/default/user.png'
                      }
                      title={"Avatar"}
                    />
                  </div>

                  <input
                    type="file"
                    onChange={this.imageChanger}
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                  />

                  <label htmlFor="contained-button-file">
                    <Button
                      variant="outlined"
                      component="span"
                      className={classes.button}
                    >
                      Change
                      </Button>
                  </label>

                  {/* <button onClick={this.uploadHandler}>Upload!</button> */}
                </div>
                <div>
                  <h5>Id: {this.props.users.id}</h5>
                  <h5>Name: {this.props.users.name}</h5>
                  <h5>Email: {this.props.users.email}</h5>
                </div>

              </div>
              <Button
                variant="contained"
                className={classes.button}
                onClick={this.props.logout}
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
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
};

function mapDispatchToProps(dispatch) {
  return {
    ...USERS(dispatch),
    ...ALERTS(dispatch),
    ...PROFILE(dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile));

