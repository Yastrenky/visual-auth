import React, { Component } from 'react';
import { Signup } from './views'
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
    console.log("App state", this.state)
    return (
      <div className="App">
        <Signup />
      </div>
    );
  }
}

export default App;
