import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import Alert from '../alert/Alert';
import { Elements, StripeProvider } from 'react-stripe-elements';
import ReactTable from "react-table";

import StripeCard from '../stripeElem';
import server, { stripekey } from '../../../config';
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

  componentDidMount() {
    fetch(server + '/getAllCharges', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        var list = result.charge.data
        var newData = [];

        list.forEach((charge => newData.push({
          name: charge.source.name,
          id: charge.id,
          brand: charge.source.brand,
          card: charge.source.last4,
          amount: charge.amount
        })));

        this.setState({
          data: newData
        })
      })
      .catch(e => console.log(e));
  }

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

            <div className="stripe-card">

              <StripeProvider apiKey={stripekey}>
                <div className="example">
                  <h1>React Stripe Elements Example</h1>
                  <Elements>
                    <StripeCard />
                  </Elements>
                </div>
              </StripeProvider>

            </div>
            <div className="table-card">
              <ReactTable
                data={this.state.data}
                columns={[
                  {
                    Header: "Cardholder Name",
                    accessor: "name"
                  },
                  {
                    Header: "Transaction id",
                    accessor: "id"
                  },
                  {
                    Header: "Brand",
                    accessor: "brand"
                  },
                  {
                    Header: "Card",
                    id: "card",
                    accessor: d => (d.card) ? "**** **** **** " + d.card : 'unknown'
                  },
                  {
                    Header: "Amount",
                    id: "amount",
                    accessor: d => (d.amount) ? "$ " + (d.amount / 100).toFixed(2) : '0'
                  }
                ]}
                defaultPageSize={15}
                className="-striped -highlight"
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
