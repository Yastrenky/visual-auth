import React, { Component } from 'react';
import { connect } from "react-redux";
import ReactTable from "react-table";
import { Button, TextField, FormControlLabel, Checkbox, withStyles } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import List from '../Lists/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '../../alert/Alert';
import server from '../../../../config';
import format from '../../../../assets/format'
import { USERS, CARDS, ALERTS } from '../../../../actions';
import styles from '../../../../styles';


function NumberFormatCustom (props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: format.money(values.value),
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

class MakePayment extends Component {
  constructor (props) {
    super(props);
    this.state = {
      alert: {
        show: false,
        title: '',
        text: ''
      },
      invoices: [],
      loadingInvoices: false,
      inv_slected: null,
      card_selected: null,
      amount: 0
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

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  amountChange = prop => event => {
    this.setState({ amount: event.target.value });
  }
  selectInvoice = inv => {
    if (this.state.inv_slected === inv) {
      this.setState({ inv_slected: null });
    }
    else {
      this.setState({ inv_slected: inv });
    }
  };

  selectCard = card => {
    this.setState({ card_selected: card });

  };

  pay = e => {
    var alert = JSON.parse(JSON.stringify(this.state.alert));
    if (this.state.inv_slected === null) {
      alert.show = true;
      alert.title = "Select Invoice";
      alert.text = 'Please select one of the invoices to pake a payment';
      this.setState({ alert: alert })
    }
    else if (this.state.card_selected === null) {
      alert.show = true;
      alert.title = "Select Card";
      alert.text = 'Please select one of the cards to pake a payment';
      this.setState({ alert: alert })
    }
    else {
      var inv_amount = null;
      this.state.invoices.forEach(inv => {
        if (inv.invoice === this.state.inv_slected) { inv_amount = inv.balance }
      });


      if (parseFloat(this.state.amount) <= 0) {
        alert.show = true;
        alert.title = "Amount error";
        alert.text = 'The amount to pay for invoice is too low. Your amount can not be cero ar a negative number. Your payment was not processed.';
        this.setState({ alert: alert })
      }
      else if (inv_amount >= parseFloat(this.state.amount)) {
        fetch(server + "/chargeCustomer", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify({
            custId: this.props.users.customerid,
            amount: this.state.amount * 100

          })
        })
          .then(response => response.json())
          .then(response => {
            console.log("charge response", response)
            if (response.charge.status === "succeeded") {
              this.props.loadCharges();
              this.props.goToTab(1)
            }
            else {
              console.log("Error in payment")
            }
          })
          .catch((e) => {
            console.log(e)
            alert.show = true;
            alert.title = "Connection lost";
            alert.text = 'Server connection lost. Please contact your service provider. ' + e;
            this.setState({
              loading: false,
              alert: alert
            })
          })

        // console.log("payment amount",this.state.amount)
        // console.log("Invoice amount",inv_amount);
      }
      else {
        alert.show = true;
        alert.title = "Amount error";
        alert.text = 'The amount to pay for invoice is too big. Your payment was not processed.';
        this.setState({ alert: alert })
      }

    }
  }

  CheckoutCal = (amount) => {
    let fees = 0, taxes = 0, total = 0
    if (amount > 0) {
      fees = ((0.029 * amount) + 0.30).toFixed(2)
      taxes = (0.06 * amount).toFixed(2)
      total = (parseFloat(amount) + parseFloat(fees) + parseFloat(taxes)).toFixed(2)
    }
    return { amount, fees, taxes, total }
  }

  componentWillMount () {
    this.setState({
      invoices: [
        {
          invoice: "AX235F",
          product: "UI Company Design",
          due: "8/7/2019",
          fee: 12,
          balance: 500,
          billed: 1000,
          payments: []
        },
        {
          invoice: "FF25NM",
          product: "UI Company Design",
          due: "8/7/2019",
          fee: 15,
          balance: 1000,
          billed: 1000,
          payments: []
        },
        {
          invoice: "LK45ML",
          product: "UI Company Design",
          due: "8/7/2019",
          fee: 20,
          balance: 800,
          billed: 1000,
          payments: []
        },
      ]
    })
  }
  render () {
    // console.log("props", this.props)
    // console.log("state", this.state)
    const alert = this.state.alert.show;
    const { classes } = this.props;
    const { amount, fees, taxes, total } = this.CheckoutCal(this.state.amount)

    return (
      <div className="makepayment-container">
        {alert ? <Alert data={this.state.alert} resetAlert={this.resetAlert} /> : null}
        <div className="invoice-container">
          <p>Select the invoice you will like to pay</p>
          <ReactTable
            data={this.state.invoices}
            columns={[
              {
                Header: "Invoice",
                accessor: "invoice",
              },
              {
                Header: "Product name",
                accessor: "product",

              },
              {
                Header: "Due date",
                accessor: "due",
              },
              {
                Header: "Charges by Fee",
                id: "fee",
                accessor: i => "$" + i.fee
              },
              {
                Header: "Balance",
                id: 'balance',
                accessor: b => "$" + b.balance

              },
              {
                Header: "",
                id: 'selected',
                accessor: b =>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.inv_slected === b.invoice ? true : false}
                        onChange={e => this.selectInvoice(b.invoice)}
                        value="checkedB"
                        color="primary"
                        className={classes.size}
                      />}
                  />
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
            loading={this.state.loadingInvoices}
          />
        </div>


        <div className="invoice-container">
          <p>Make a payment</p>
          <div className="invoice-schedule">
            {!this.props.cards.cardsList_loading ?
              <div className="invoice-container payment-options-list">
                <List data={this.props.cards.cardsList} selectCard={this.selectCard} />
                <Button variant="contained" color="primary" className={classes.button} onClick={e => this.props.goToTab(2)}>
                  ADD CARD
                </Button>
              </div>
              :
              <CircularProgress className={classes.progress} />
            }
            <div className="payment-checkout">
              <TextField
                label="Amount"
                value={this.state.amount}
                id="bootstrap-input"
                onChange={this.amountChange('amount')}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  disableUnderline: true,
                  classes: {
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.bootstrapFormLabel,
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ marginBottom: 5 }}>Amount: </span><span>$ {amount}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ marginBottom: 5 }}>Fees: </span><span>$ {fees}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ marginBottom: 5 }}>Taxes: </span><span>$ {taxes}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ marginBottom: 5 }}>Total: </span><span>$ {total}</span></div>
              </div>
              <Button variant="contained" color="secondary" onClick={e => this.pay()} className={classes.button} >
                PAY
              </Button>

            </div>
          </div>
        </div>


      </div>
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
    ...ALERTS(dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MakePayment));
