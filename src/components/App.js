import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { Signup, Login, Forgot, Reset, Profile } from './views';
import server from '../config/config';
// import route from './routes'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        acces: false,
        id: null,
        name: null,
        email: null,
        password: null,
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


  render() {
    console.log("App state", this.state)

    return (
      <div className="App">

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
