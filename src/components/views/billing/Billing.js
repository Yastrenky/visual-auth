import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import Alert from '../alert/Alert';
import Tabs from './Tabs';
import './billing.css';
import "react-table/react-table.css";
import Footer from '../footer/Footer';
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

    var data = this.props.data;
    this.state = {
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
    var alert = JSON.parse(JSON.stringify(this.state.alert));
    alert = {
      show: false,
      title: '',
      text: ''
    }
    this.setState({ alert: alert })
  }

  cardsQtyHandle = num => {
    this.setState({ cards_qty: num })
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };



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

  // componentDidMount() {
  //   this.getSavedCards();
  // }

  render() {
    // console.log("state", this.state)
    const { classes } = this.props;
    const alert = this.state.alert.show;
    return (
      <div className='view-container'>
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
              />
            </div>
          </div>


        </div>

        <Footer />
      </div >
    );
  }
}

export default withStyles(styles)(Billing);
