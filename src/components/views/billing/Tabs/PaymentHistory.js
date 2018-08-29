import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import server from '../../../../config';
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
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  getCharges = () => {
    fetch(server + '/getAllCharges', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        console.log(result)
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
          data: newData
        })
      })
      .catch(e => console.log(e));
  }

  formatStripeDate = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    var objtime = format.date(date)
    return objtime.date +" || "+ objtime.time
  }

  componentDidMount() {
    this.getCharges();
  }

  render() {
    console.log("state", this.state)
    // const { classes } = this.props;

    return (
      <div>

        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Posted date",
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
              accessor: 'status'
            },
            //   {
            //     Header: "Delete Card",
            //     id: "click-me-button",
            //     Cell: ({ row }) => (<Icon className={classes.icon} color="secondary" style={{ fontSize: 30 }} onClick={(e) => this.deletCard(row.id)}>
            //       delete_forever
            //  </Icon>
            //       //  <button onClick={(e) => this.deletCard(row.id)}>Delete</button>
            //     )
            //   }
          ]}
          defaultPageSize={15}
          className="-striped -highlight"
        />


      </div>
    );
  }
}

export default withStyles(styles)(PaymentHistory);
