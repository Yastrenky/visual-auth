import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import validate from '../../../assets/validate';
import Footer from '../footer/Footer';
import { ALERTS, USERS } from '../../../actions';
import './forgot.css';
import styles from '../../../styles'

class Forgot extends PureComponent {

  state = {
    email: '',
  };

  onSubmit = event => {
    var email = this.state.email;

    if (!validate.email(email)) {
      this.props.showAlert('Invalid Email', 'Please enter a email with the valid parameters.')
    }
    else {
      this.props.forgot(email, (show, title, text) => {
        if (show) {
          this.props.showAlert(title, text)
        }
      })
    }
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className = 'view-container'>
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
              Send
            </Button>
            <hr></hr>
            <h5>Opss! I remember my password now. <Link to='/login'> Login </Link></h5>
            <h5>Don't have an account? <Link to='/signup'> Signup </Link></h5>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...ALERTS(dispatch),
  ...USERS(dispatch)
})

export default withStyles(styles)(connect(null, mapDispatchToProps)(Forgot));
