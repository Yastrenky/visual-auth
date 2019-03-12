import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import Tabs from './Tabs';
import { USERS } from '../../../actions';
import './billing.css';
import "react-table/react-table.css";
import { NavMenu, Footer, Alert} from '../';
import server from '../../../config';

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
  constructor(props) {
    super(props);

    var data = this.props.users;
    this.state = {
      chargedlist: [],
      loadingchargedcardlist: true,
      cards: {
        list: [],
        loading: false
      },

      user: {
        id: '' || data.id,
        name: '' || data.name,
        email: '' || data.email,
        customerid: data.customerid || null
      },
      alert: {
        show: false,
        title: '',
        text: ''
      },
      anchorEl: null,
    };
  }

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
    fetch(server + '/getCustomerCharges', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        custId: this.state.user.customerid,
      })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.err) {
          console.log(result.err.message)
        }
        else {
          var list = result.charge.data
          var newData = [];

          list.forEach((charge => newData.push({
            date: charge.created,
            card_id: charge.source.id,
            charge_id: charge.id,
            card: charge.source.last4,
            status: charge.status,
            amount: charge.amount,
            currency: charge.currency

          })));
          this.setState({
            chargedlist: newData,
            loadingchargedcardlist: false,
          })
        }
      }).catch(e => {
        this.setState({ loadingchargedcardlist: false, })
        console.log(e)
      });
  }

  getSavedCards = (callback) => {
    var newcards = JSON.parse(JSON.stringify(this.state.cards));
    newcards.loading = true;

    this.setState({
      loadingdata: true,
      cards: newcards
    });

    fetch(server + '/getAllCards', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        var newData = [];
        if (!result.err) {
          var list = result.cards.data
          list.forEach((card => newData.push({
            name: card.name,
            id: card.id,
            brand: card.brand,
            card: card.last4,
            date: card.exp_month + "/" + card.exp_year,
            zipcode: card.address_zip
          })));
        }
        var newcards = JSON.parse(JSON.stringify(this.state.cards));
        newcards.list = newData;
        newcards.loading = false;

        callback(null, newData)
        this.setState({
          cards: newcards,
        })
      })
      .catch(e => {
        callback(e, null)
        console.log(e)
      });
  }


  render() {

    // console.log("state", this.state)
    const { classes } = this.props;
    const alert = this.state.alert.show;
    return (
      <div className='view-container'>
        <NavMenu variant="contained" />
        {alert ? <Alert data={this.state.alert} resetAlert={this.resetAlert} /> : null}

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
              <Tabs
                data={this.state.data}
                customerid={this.state.user.customerid}
                cards={this.state.cards}
                getSavedCards={this.getSavedCards}
                getCharges={this.getCharges}
                chargedlist={this.state.chargedlist}
                loadingchargedcardlist={this.state.loadingchargedcardlist}
              />
            </div>
          </div>


        </div>

        <Footer />
      </div >
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => USERS(dispatch)

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Billing));

