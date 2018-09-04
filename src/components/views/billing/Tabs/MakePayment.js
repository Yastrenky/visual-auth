import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import NumberFormat from 'react-number-format';

import List from '../Lists/List'
// import server from '../../../../config';
// import format from '../../../../assets/format'
// import Icon from '@material-ui/core/Icon';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  size: {
    width: 40,
    height: 0,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menu: {
    width: 200,
  },
  button: {
    width: 100,
  },
  input: {
    display: 'none',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});


class MakePayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [],
      loadingInvoices: false,
      slected: null,
      amount: ''
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  selectInvoice = inv => {
    if (this.state.slected === inv) {
      this.setState({ slected: null });
    }
    else {
      this.setState({ slected: inv });
    }
  };

  render() {
    console.log("state", this.state)
    const { classes } = this.props;

    return (
      <div className="makepayment-container">
        <div className="invoice-container">
          <p>Select the invoice you will like to pay</p>
          <ReactTable
            data={[
              {
                invoice: "AX235F",
                product: "UI Company Design",
                due: "8/7/2019",
                apr: "15",
                balance: 1000,
                billed: 1000,
                payments: []
              },
              {
                invoice: "FF25NM",
                product: "UI Company Design",
                due: "8/7/2019",
                apr: "15",
                balance: 1000,
                billed: 1000,
                payments: []
              },
              {
                invoice: "LK45ML",
                product: "UI Company Design",
                due: "8/7/2019",
                apr: "15",
                balance: 1000,
                billed: 1000,
                payments: []
              },
            ]}
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
                Header: "APR",
                id: "apr",
                accessor: i => "%" + i.apr
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
                        checked={this.state.slected === b.invoice ? true : false}
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
            <List />
            <div className="payment-checkout">
              <TextField
                label="Amount"
                value={this.state.amount}
                id="bootstrap-input"
                onChange={this.handleChange('amount')}
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
              <Button variant="contained" color="secondary" className={classes.button}>
                PAY
              </Button>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default withStyles(styles)(MakePayment);
