import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Tabs from './Tabs';
import { USERS, CARDS, ALERTS, PROFILE } from '../../../actions';
import './billing.css';
import "react-table/react-table.css";
import { NavMenu, Footer } from '../';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../../../styles'

class Billing extends Component {

  componentDidMount () {
    this.props.getCards()
    this.props.loadCharges()
    this.props.loadProfile((show, title, text) => {
      if (show) {
        this.props.showAlert(title, text)
      }
    })
  }

  render () {
    // console.log("billing props", this.props)
    const { classes, users } = this.props;
    return (
      <div className='view-container'>
        <NavMenu variant="contained" />
        <header className="Billing-header">
          <h1 className="Billing-title">
            <Icon className={classes.icon} color="primary" style={{ fontSize: 30 }}>
              airplay
            </Icon>
            Billing
           </h1>
        </header>
        <div className="auth-container">

          <div className={"Billing-card auht-view"}>
            <div className="tabs-card">
              {users.id ? <Tabs userId={users.id} /> : <CircularProgress className={classes.progress} />}
            </div>
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

function mapStateToProps (state) {
  return {
    users: state.users,
    cards: state.cards
  }
};

function mapDispatchToProps (dispatch) {
  return {
    ...USERS(dispatch),
    ...CARDS(dispatch),
    ...ALERTS(dispatch),
    ...PROFILE(dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Billing));

