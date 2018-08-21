import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import Alert from '../alert/Alert';
import server from '../../../config';
import Tabs from './Tabs';
import './billing.css';
import "react-table/react-table.css";

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
      data: []
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

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
  };

  getSavedCards = () => {
    fetch(server + '/getAllCards', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        var list = result.cards.data
        var newData = [];

        list.forEach((card => newData.push({
          name: card.name,
          id: card.id,
          brand: card.brand,
          card: card.last4,
          date: card.exp_month + "/" + card.exp_year,
          zipcode: card.address_zip
        })));

        this.setState({
          data: newData
        })
      })
      .catch(e => console.log(e));
  }
  componentDidMount() {
    this.getSavedCards();
  }

  render() {
    console.log("state", this.state.user)
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

            <div className="table-card">

              <Tabs
                data={this.state.data}
                customerid={this.state.user.customerid}
                getSavedCards = {this.getSavedCards}
              />

            </div>
          </div>


        </div>

        <footer className="footer auth-footer">
          <h5>Copyright © 2018 : <a href="http://www.directbravo.com"> Y.Bravo </a></h5>
        </footer>
      </div >
    );
  }
}

export default withStyles(styles)(Billing);
