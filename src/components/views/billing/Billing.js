import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import Tabs from './Tabs';
import { USERS, CARDS } from '../../../actions';
import './billing.css';
import "react-table/react-table.css";
import { NavMenu, Footer } from '../';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 320,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: 15,
    width: 100,
  },
  input: {
    display: 'none',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
});


class Billing extends Component {

  resetAlert = () => {
    this.setState({ alert: { show: false, title: '', text: '' } })
  }

  cardsQtyHandle = num => {
    this.setState({ cards_qty: num })
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };

  getCharges = () => {
    const customerid = this.props.users.customerid
    this.props.loadCharges(customerid)
  }

  componentDidMount () {
    this.props.getCards()
    this.props.loadCharges()
  }

  render () {
    // console.log("billing props", this.props)
    const { classes } = this.props;
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
              <Tabs />
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
    ...CARDS(dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Billing));

