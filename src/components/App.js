import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { Dashboard, Signup, Login, Forgot, Reset, Profile, Billing } from './views';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Alert from './views/alert/Alert';
import { connect } from "react-redux";
import { USERS, CREDENTIALS, ALERTS } from '../actions';
import './App.css';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  media: {
    backgroundPosition: 'center',
    backgroundSize: 142,
    height: 140,
    width: 140,
    borderRadius: 100,
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
  initial: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      key: null,
    };
  }

  componentDidMount () {
    this.props.load((show, title, text) => {
      if (show) {
        this.props.showAlert( title, text )
      }
    })
  }

  render () {
    // console.log("USER props", this.props)
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
