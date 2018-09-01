import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import List from '../Lists/List'
// import server from '../../../../config';
// import format from '../../../../assets/format'
// import Icon from '@material-ui/core/Icon';

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
});


class MakePayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [],
      loadingInvoices: false,
      slected: null,
    };
  }

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
                payments:[]
              },
              {
                invoice: "FF25NM",
                product: "UI Company Design",
                due: "8/7/2019",
                apr: "15",
                balance: 1000,
                billed:1000,
                payments:[]
              },
              {
                invoice: "LK45ML",
                product: "UI Company Design",
                due: "8/7/2019",
                apr: "15",
                balance: 1000,
                billed: 1000,
                payments:[]
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
            defaultPageSize={5}
            className="-striped -highlight"
            loading={this.state.loadingInvoices}
          />


        </div>
        <div>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          </div>

          <List/>
      </div>
    );
  }
}

export default withStyles(styles)(MakePayment);
