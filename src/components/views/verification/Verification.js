import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Footer from '../footer/Footer';
import { ALERTS, USERS } from '../../../actions';
import './verification.css';
import styles from '../../../styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom'

const Counter = (props) => {
  if (props.timeout > 0) {
    props.updateTime(props.timeout)
  }
  else {
    return <Redirect to='/login' />
  }
  return (
    <div>
      Email verified.
      <h5> Redirecting to login in: {props.timeout}</h5>
    </div>
  );
}

const Progress = (props) => {

  return (
    <div>
      {props.showLoad ?
        <div>
          <CircularProgress className={props.classes.progress} />
          <h5>We are processing your request. Please hold</h5>
        </div>
        :
        <h5>{props.message}</h5>}
    </div>
  )
}
class Verify extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      showLoad: true,
      verify: false,
      timeout: 8,
      message: ''
    }
  }

  updateTime = (time) => {
    setTimeout(
      function () {
        this.setState({ timeout: time - 1 });
      }
        .bind(this),
      1000
    )
  }
  componentDidMount () {
    const token = this.props.match.params.handle;
    this.props.veryfyEmail(token, (status, title, message, err) => {

      if (!err) {
        this.setState({ verify: true })
      }
      else {
        // this.props.showAlert(title, message)
        this.setState({ showLoad: false, message: message })
      }
    })
  }
  render () {
    console.log("state", this.state)

    const { classes } = this.props;
    const token = this.props.match.params.handle;
    return (
      <div className='view-container'>
        <header className="Verify-header">
          <h1 className="Verify-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              email
            </Icon>
            Verify email
           </h1>
        </header>

        <div className="auth-container">
          <div className="Verify-card auht-view">
            Verifying token: {token}
            <hr></hr>
            {this.state.verify ? <Counter updateTime={this.updateTime} timeout={this.state.timeout} /> : <Progress classes={classes} showLoad={this.state.showLoad} message={this.state.message}/>}
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

export default withStyles(styles)(connect(null, mapDispatchToProps)(Verify));
