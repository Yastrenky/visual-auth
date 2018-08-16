import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { Dashboard, Signup, Login, Forgot, Reset, Profile, NavMenu, Billing } from './views';
import Alert from './views/alert/Alert';
import server from '../config';
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
        imageName: null
      },
      alert: {
        show: false,
        title: '',
        text: ''
      }
    };
  }

  updateUser = (user) => {
    this.setState({
      user: user
    })
  }
  logIn = (data) => {
    let user = {
      acces: true,
      id: data._id,
      name: data.username,
      email: data.email,
      password: data.password,
      imageName: data.imageName
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
      .then(result => this.setState({ key: result.publicKey }))
      .catch(e => {

        alert.show = true;
        alert.title = "Connection lost";
        alert.text = 'Server connection lost. Please contact your service provider. ' + e;
        this.setState({ alert: alert })
      });
  }

  render() {

    // console.log("App state", this.state.user.imageName)
    const alert = this.state.alert.show;

    return (
      <div className="App">
        {alert ? <Alert data={this.state.alert} resetAlert={this.resetAlert} /> : null}
        {this.state.user.acces ? <NavMenu logOut={this.logOut} variant="contained" /> : null}
        <Switch>

          <Route exact path='/'
            render={() => <div>
              <Link to='/signup'> Signup </Link>
              <br />
              <Link to='/login'> Login </Link>

            </div>}
          />

          <Route exact path='/dashboard'
            render={() =>
              this.state.user.acces ?
                <Dashboard logOut={this.logOut} data={this.state.user} />
                :
                <Redirect to='/login' />
            }
          />

          <Route exact path='/billing'
            render={() =>
              this.state.user.acces ?
                <Billing data={this.state.user} />
                :
                <Redirect to='/login' />
            }
          />

          <Route exact path='/profile'
            render={() =>
              this.state.user.acces ?
                <Profile
                  logOut={this.logOut}
                  data={this.state.user}
                  updateUser={this.updateUser}
                />
                :
                <Redirect to='/login' />
            }
          />

          <Route exact path='/login'
            render={() =>
              this.state.user.acces ?
                <Redirect to='/billing' />
                :
                <Login logIn={this.logIn} handleRoute={this.handleRoute} />}
          />

          <Route exact path='/signup'
            render={() => <Signup />}
          />

          <Route exact path='/forgot'
            render={() => <Forgot />}
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
