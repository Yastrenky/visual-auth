import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import "react-table/react-table.css";
import { Alert, NavMenu, Footer } from '../';
import './dashboard.css';
import styles from '../../../styles'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {
        show: false,
        title: '',
        text: ''
      },
    };
  }

  resetAlert = () => {
    this.setState({ alert: { show: false, title: '', text: '' } })
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };

  componentDidMount() {

  }

  render() {
    // console.log("state", this.state)
    const { classes } = this.props;
    const alert = this.state.alert.show;

    return (
      <div className='view-container'>
        <NavMenu variant="contained" />
        {alert ? <Alert data={this.state.alert} resetAlert={this.resetAlert} /> : null}

        <header className="Dashboard-header">
          <h1 className="Dashboard-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              airplay
            </Icon>
            Dashboard
           </h1>
        </header>
        <div className="auth-container">

          <div className={"Dashboard-card auht-view"}>

          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

export default withStyles(styles)(Dashboard);
