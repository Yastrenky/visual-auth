import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import ReactTable from "react-table";
import { Button, TextField, FormControlLabel, Checkbox, withStyles } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { List } from '../sourceData';
import CircularProgress from '@material-ui/core/CircularProgress';
import format from '../../../../assets/format'
import { USERS, CARDS, INVOICES, ALERTS } from '../../../../actions';
import styles from '../../../../styles';


function NumberFormatCustom(props) {
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

class MakePayment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inv_slected: {},
      card_selected: null,
      amount: 0
    };
  }

  clearFields = () => {
    this.setState({
      inv_slected: {},
      card_selected: null,
      amount: 0
    });
  };

  amountChange = event => {
    this.setState({ amount: event.target.value });
  }

  selectInvoice = inv => {
    if (this.state.inv_slected.number === inv.number) {
      this.setState({ inv_slected: {} });
    }
    else {
      this.setState({ inv_slected: inv });
    }
  };

  selectCard = card => {
    this.setState({ card_selected: card });
  };

  pay = async e => {
    e.preventDefault()
    e.stopPropagation()

    const { showAlert, chargeCustomer, users, loadCharges, goToTab } = this.props
    const { inv_slected, card_selected, amount } = this.state

    if (!inv_slected.number) {
      showAlert('Select Invoice', 'Please select one of the invoices to pake a payment.')
      return
    }
    if (card_selected === null) {
      showAlert('Select Card', 'Please select one of the cards to pake a payment.')
      return
    }

    if (parseFloat(amount) <= 0) {
      showAlert('Amount error', 'The amount to pay for invoice is too low. Your amount can not be cero ar a negative number. Your payment was not processed.')
      return
    }

    if (inv_slected.amount_remaining < parseFloat(amount)) {
      showAlert('Amount error', 'The amount to pay for invoice is too big. Your payment was not processed.')
      return
    }

    const { total } = this.CheckoutCal(amount)
    const succeeded = await chargeCustomer(users.customerid, card_selected.id, total)

    if (succeeded) {
      this.clearFields()
      loadCharges();
      goToTab(1)
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

componentDidMount() {
  this.props.updateInv()
}

render() {
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
              Header: "#",
              accessor: "number",
            },
            {
              Header: "Due date",
              id: "due_date",
              accessor: d => format.formatStripeDate(d.due_date)
            },
            {
              Header: "Amount due",
              id: "fee",
              accessor: i => "$" + format.money(i.amount_due.toString())
            },
            {
              Header: "Amount paid",
              id: "fee",
              accessor: i => "$" + format.money(i.amount_paid.toString())
            },
            {
              Header: "Amount remaining",
              id: 'balance',
              accessor: a => "$" + format.money(a.amount_remaining.toString())
            },
            {
              Header: "",
              id: 'selected',
              accessor: b =>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.inv_slected.number === b.number ? true : false}
                      onChange={e => this.selectInvoice(b)}
                      value="checkedB"
                      color="primary"
                      className={classes.size}
                    />}
                />,
              width: 80
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
              onChange={this.amountChange}
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ marginBottom: 5 }}>Vendor fees: </span><span>$ {fees}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ marginBottom: 5 }}>Taxes: </span><span>$ {taxes}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ marginBottom: 5 }}>Total: </span><span>$ {total}</span></div>
            </div>
            <Button variant="contained" color="secondary" onClick={this.pay} className={classes.button} >
              PAY
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}
}

function mapStateToProps(state) {
  return {
    users: state.users,
    cards: state.cards,
    invoices: state.invoices
  }
};

function mapDispatchToProps(dispatch) {
  return {
    ...USERS(dispatch),
    ...CARDS(dispatch),
    ...ALERTS(dispatch),
    ...INVOICES(dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MakePayment));
