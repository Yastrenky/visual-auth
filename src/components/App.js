import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Signup } from './views';
import { Login } from './views';
import './App.css';

class App extends Component {

  state = {
    user: {}
  };

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };


  render() {
    // console.log("App state", this.state)
    return (
      <div className="App">
        <Switch>
          <Route exact path='/'
            render={() => <Login />}
          />
          <Route exact path='/signup'
            render={() => <Signup />}
          />
          <Route exact path='/login'
            render={() => <Login />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
