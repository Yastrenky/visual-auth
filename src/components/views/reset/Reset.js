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
import './reset.css';
import styles from '../../../styles'

class Reset extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      copassword: '',
      alert: {
        show: false,
        title: '',
        text: ''
      }
    };
  }
  
  onSubmit = event => {
    const password = this.state.password;
    const copassword = this.state.copassword;
    const token = this.props.match.params.handle;

    if (!validate.password(password)) {
      this.props.showAlert('Invalid Password', 'Please enter a password with the valid parameters.')
    }
    else if (!validate.password(copassword)) {
      this.props.showAlert('Invalid Password', 'Please enter a confirmed password with the valid parameters.')
    }
    else if (password !== copassword) {
      this.props.showAlert('Invalid Password', 'The confirmed password is not the same.')
    }
    else {

      this.props.reset(token, password, (show, title, text) => {
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

  render () {
    // console.log("state", this.state)

    const { classes } = this.props;
    return (
      <div className='view-container'>
        <header className="main-header">
          <h1 className="Reset-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              lock_open
            </Icon>
            Reset Password
           </h1>
        </header>

        <div className="auth-container">
          <div className="Reset-card auht-view">

            <TextField
              id="password"
              label="New password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
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
              onClick={this.onSubmit}
            >
              Change
            </Button>
            <hr></hr>
            <h5>Opss! I remember my password now. <Link to='/login'> Login </Link></h5>
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

export default withStyles(styles)(connect(null, mapDispatchToProps)(Reset));
