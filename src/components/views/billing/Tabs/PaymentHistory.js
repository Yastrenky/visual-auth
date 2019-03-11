import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import format from '../../../../assets/format'
// import Icon from '@material-ui/core/Icon';

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
});


class PaymentHistory extends Component {
  formatStripeDate = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    var objtime = format.date(date)
    return objtime.date + " || " + objtime.time
  }
  componentDidMount(){
    this.props.getCharges();
  }
  render() {
    // console.log("props", this.props)
    // console.log("state", this.state)
    // const { classes } = this.props;

    return (
      <div>

        <ReactTable
          data={this.props.chargedlist}
          columns={[
            {
              Header: "Posted",
              id: "date",
              accessor: t => this.formatStripeDate(t.date)
            },
            {
              Header: "Card",
              id: "card",
              accessor: d => (d.card) ? "**** **** **** " + d.card : 'unknown'
            },
            {
              Header: "Currency",
              id: "currency",
              accessor: c => c.currency.toUpperCase()
            },
            {
              Header: "Amount",
              id: "amount",
              accessor: a => format.money(a.amount.toString())
            },
            {
              Header: "Status",
              id: 'status',
              accessor: s => s.status.toUpperCase()
            }
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
          loading={this.props.loadingchargedcardlist}
        />


      </div>
    );
  }
}

export default withStyles(styles)(PaymentHistory);
