import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { Signup, Login, Forgot, Reset, Profile } from './views';
import Alert from './views/alert/Alert';
import server from '../config/config';
// import Cryptr from 'cryptr';
// import route from './routes'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      user: {
        acces: false,
        id: null,
        name: null,
        email: null,
        password: null,
      },
      alert: {
        show: false,
        title: '',
        text: ''
      }
    };
  }

  logIn = (data) => {
    let user = {
      acces: true,
      id: data._id,
      name: data.username,
      email: data.email,
      password: data.password,
    }
    this.setState({
      user: user
    });
  }

  logOut = () => {
    const user = {
      acces: false,
      id: null,
      name: null,
      email: null,
      password: null,
    }
    fetch(server + '/logout', { credentials: 'include' })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(e => console.log(e));

    this.setState({
      user: user,
    });
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

  componentDidMount() {
    var alert = JSON.parse(JSON.stringify(this.state.alert));
    fetch(server + '/getSecret', { credentials: 'include' })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(e => {
        alert.show = true;
        alert.title = "Connection lost";
        alert.text = 'Server connection lost. Please contact your service provider.';
        this.setState({ alert: alert })
      });
  }

  render() {
    console.log("App state", this.state)
    const alert = this.state.alert.show;

    return (
      <div className="App">
        {alert ? <Alert data={this.state.alert} resetAlert={this.resetAlert} /> : null}
        <Switch>
          <Route exact path='/'
            render={() => <div>
              <Link to='/signup'> Signup </Link>
              <br />
              <Link to='/login'> Login </Link>

            </div>}
          />
          <Route exact path='/signup'
            render={() => <Signup />}
          />

          <Route exact path='/login'
            render={() =>
              this.state.user.acces ?
                <Redirect to='/profile' />
                :
                <Login logIn={this.logIn} handleRoute={this.handleRoute} />}
          />

          <Route exact path='/forgot'
            render={() => <Forgot />}
          />

          <Route exact path='/profile'
            render={() =>
              this.state.user.acces ?
                <Profile logOut={this.logOut} data={this.state.user} />
                :
                <Redirect to='/login' />
            }
          />

          <Route path='/reset/:handle'
            component={Reset}
          />
        </Switch>

      </div>
    );
  }
}

export default App;
