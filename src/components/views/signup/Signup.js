import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import validate from '../../../assets/validate'
import { recaptcha } from '../../../config';
import Recaptcha from 'react-recaptcha';
import Footer from '../footer/Footer';
import { ALERTS , USERS} from '../../../actions';
import './signup.css';
import styles from '../../../styles'

class App extends Component {

  state = {
    name: 'Yastrenky',
    email: 'ybramos91@gmail.com',
    password: 'Yast56238',
    copassword: 'Yast56238',
    loadRecaptcha: false
  };

  onSubmit = event => {
    var name = this.state.name;
    var email = this.state.email;
    var password = this.state.password;
    var copassword = this.state.copassword;

    if (!validate.name(name)) {
      this.props.showAlert('Invalid Name', 'Please enter a name with the valid parameters.')
    }
    else if (!validate.email(email)) {
      this.props.showAlert('Invalid Email', 'Please enter a email with the valid parameters.')
    }
    else if (!validate.password(password)) {
      this.props.showAlert('Invalid Password', 'Please enter a password with the valid parameters.')
    }
    else if (!validate.password(copassword) && password !== copassword) {
      this.props.showAlert('Invalid Password', 'Please enter a confirmed password with the valid parameters.')
    }
    else if (!this.state.recaptcha) {
      this.resetRecaptcha();
      this.props.showAlert('Bot verification fail', 'Access to login denied by google verification.')
    }
    else {
      this.props.signup(name, email, password, (show, title, text) => {
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
    // console.log(this.state)
    const { classes } = this.props;
    return (
      <div className='view-container'>
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
              Signup
            </Button>
            <hr></hr>
            <h5>Already have an account? <Link to='/login'> Login </Link></h5>
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

export default withStyles(styles)(connect(null, mapDispatchToProps)(App));
