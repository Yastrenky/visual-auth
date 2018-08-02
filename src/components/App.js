import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Signup, Login, Forgot, Reset, Profile } from './views';
import './App.css';

class App extends Component {

  state = {
    user: {
      acces: true,
      id: null,
      name: null,
      email: null,
      password: null,
    }
  };

  logOut = () => {
    const user = {
      acces: false,
      id: null,
      name: null,
      email: null,
      password: null,
    }

    this.setState({ user: user });
  };


  render() {
    console.log("App state", this.state)
    return (
      <div className="App">
        <Switch>
          <Route exact path='/'
            render={() => <Profile logOut = {this.logOut}/>}
          />
          <Route exact path='/signup'
            render={() => <Signup />}
          />
          <Route exact path='/login'
            render={() => <Login />}
          />
          <Route exact path='/forgot'
            render={() => <Forgot />}
          />
          <Route path='/reset'
            render={() => <Reset />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
