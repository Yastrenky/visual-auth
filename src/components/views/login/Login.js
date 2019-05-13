import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import CircularProgress from '@material-ui/core/CircularProgress';
import validate from '../../../assets/validate';
import { recaptcha } from '../../../config';
import { connect } from "react-redux";
import { USERS, ALERTS } from '../../../actions';
import Recaptcha from 'react-recaptcha';
import Footer from '../footer/Footer';
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
  progress: {
    margin: theme.spacing.unit * 2,
  },
});


class Login extends Component {

  state = {
    email: 'ybramos91@gmail.com',
    password: 'Yast56238',// only for testing
    loadRecaptcha: false
  };

  onSubmit = event => {
    var email = this.state.email;
    var password = this.state.password;

    if (!validate.email(email)) {
      this.props.showAlert('Invalid Email', 'Please enter a email with the valid parameters.')
    }

    else if (!validate.password(password)) {
      this.props.showAlert('Invalid Password', 'Please enter a password with the valid parameters.')
    }
    // else if (!this.state.recaptcha) {
    //   // console.log("Invalid recaptcha")
    //   this.resetRecaptcha();
    // this.props.showAlert( 'Bot verification fail', 'Access to login denied by google verification.')
    // }
    else {
      this.props.login({ email, password }, (show, title, text) => {
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

  callback = () => {
    this.setState({ loadRecaptcha: true })
  };

  verifyCallback = (response) => {
    this.setState({ recaptcha: response })
  };

  resetRecaptcha = () => {
    this.recaptchaInstance.reset();
  };
  render () {
    // console.log("state", this.state)
    const { classes } = this.props;

    return (
      <div className='view-container'>
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
            {!this.state.loadRecaptcha ? <CircularProgress className={classes.progress} /> : null}
            <Recaptcha
              ref={e => this.recaptchaInstance = e}
              sitekey={recaptcha}
              render="explicit"
              onloadCallback={this.callback}
              verifyCallback={this.verifyCallback}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onSubmit}
            >
              Login
            </Button>
            <hr></hr>
            <h5>Don't have an account? <Link to='/signup'> Signup </Link></h5>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  ...USERS(dispatch),
  ...ALERTS(dispatch)
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));

