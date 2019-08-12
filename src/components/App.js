import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { Dashboard, Signup, Login, Forgot, Reset, Profile, Billing, Verification } from './views';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Alert from './views/alert/Alert';
import { connect } from "react-redux";
import { USERS, CREDENTIALS, ALERTS } from '../actions';
import { cryptr } from '../index'
import styles from '../styles'
import './App.css';


// eslint-disable-next-line
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

class App extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      key: null,
    };
  }

  componentDidMount () {
    // this.props.load((show, title, text) => {
    //   if (show) {
    //     this.props.showAlert(title, text)
    //   }
    // })
    this.props.getSessionID(sessionId => {
      const localSessionId = cryptr.decrypt((JSON.parse(sessionStorage.getItem('session'))))
      if (localSessionId !== sessionId) {
        console.log('<<< AUTO LOGOUT >>>')
        this.props.logout()
        this.props.showAlert('Session Error', 'Your session has expired, if you like to continue working please login again.')
      }
    })
  }

  render () {
    // console.log("USER props", this.props.users)
    const { classes } = this.props;
    var acces = this.props.users.acces;
    const alert = this.props.alert.show;

    return (
      <div className="App">
        {alert ? <Alert data={this.props.alert} resetAlert={this.props.closeAlert} /> : null}
        <BrowserRouter>
          <Switch>
            <Route exact path='/'
              render={() => <div>
                <Button variant="contained" color="secondary" href="/signup" className={classes.button}>
                  Signup
              </Button>

                <br />
                <Button variant="contained" color="primary" href="/login" className={classes.button}>
                  Login
              </Button>
              </div>}
            />

            <Route exact path='/dashboard'
              render={() => acces ?
                <Dashboard />
                :
                <Redirect to='/login' />
              }
            />

            <Route exact path='/profile'
              render={() => acces ?
                <Profile />
                :
                <Redirect to='/login' />
              }
            />

            <Route exact path='/login'
              render={() => acces ?
                <Redirect to='/billing' />
                :
                <Login />}
            />

            <Route exact path='/signup'
              render={() => <Signup />}
            />

            <Route exact path='/billing'
              render={() => acces ?
                <Billing />
                :
                <Redirect to='/login' />
              }
            />

            <Route exact path='/forgot'
              render={() => <Forgot />}
            />
            <Route path='/reset/:handle'
              component={Reset}
            />
            <Route path='/mail_verification/:handle'
              component={Verification}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    users: state.users,
    credentials: state.credentials,
    alert: state.alerts
  }
};

function mapDispatchToProps (dispatch) {
  return {
    ...USERS(dispatch),
    ...CREDENTIALS(dispatch),
    ...ALERTS(dispatch)

  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
