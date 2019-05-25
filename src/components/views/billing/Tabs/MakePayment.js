import React, { Component } from 'react';
import { connect } from "react-redux";
import ReactTable from "react-table";
import { Button, TextField, FormControlLabel, Checkbox, withStyles } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import List from '../Lists/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import server from '../../../../config';
import format from '../../../../assets/format'
import { USERS, CARDS, ALERTS, INVOICES } from '../../../../actions';
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
      inv_slected: null,
      card_selected: null,
      amount: 0
    };
  }

  clearFields = ev => {
    this.setState({
      inv_slected: null,
      card_selected: null,
      amount: 0 });
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
    if (this.state.inv_slected === null) {
      this.props.showAlert('Select Invoice', 'Please select one of the invoices to pake a payment.')
    }
    else if (this.state.card_selected === null) {
      this.props.showAlert('Select Card', 'Please select one of the cards to pake a payment.')
    }
    else {
      var inv_amount = null;
      this.props.invoices.list.forEach(inv => {
        if (inv.invoice === this.state.inv_slected) { inv_amount = inv.balance }
      });


      if (parseFloat(this.state.amount) <= 0) {
        this.props.showAlert('Amount error', 'The amount to pay for invoice is too low. Your amount can not be cero ar a negative number. Your payment was not processed.')
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
            amount: this.state.amount * 100,
            source: this.state.card_selected
          })
        })
          .then(response => response.json())
          .then(response => {
            // console.log("charge response", response)
            if (response.charge.status === "succeeded") {
              this.clearFields()
              this.props.loadCharges();
              this.props.goToTab(1)
            }
            else {
              console.log("Error in payment")
            }
          })
          .catch((e) => {
            console.log(e)
            this.props.showAlert('Connection lost', 'Server connection lost. Please contact your service provider. ' + e)
          })

        // console.log("payment amount",this.state.amount)
        // console.log("Invoice amount",inv_amount);
      }
      else {
        this.props.showAlert('Amount error', 'The amount to pay for invoice is too big. Your payment was not processed.')
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

  componentDidMount () {
    this.props.updateInv((show, title, text) => {
      if (show) {
        this.props.showAlert(title, text)
      }
    })
  }

  render () {
    // console.log("props", this.props)
    // console.log("state", this.state)
    const { classes } = this.props;
    const { amount, fees, taxes, total } = this.CheckoutCal(this.state.amount)

    return (
      <div className="makepayment-container">
        <div className="invoice-container">
          <p>Select the invoice you will like to pay</p>
          <ReactTable
            data={this.props.invoices.list}
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
            loading={this.props.invoices.loadingInvoices}
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
    cards: state.cards,
    invoices: state.invoices
  }
};

function mapDispatchToProps (dispatch) {
  return {
    ...USERS(dispatch),
    ...CARDS(dispatch),
    ...ALERTS(dispatch),
    ...INVOICES(dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MakePayment));
