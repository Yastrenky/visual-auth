import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import format from '../../../../assets/format'
import { USERS, CARDS } from '../../../../actions';
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
  render() {
    return (
      <div>

        <ReactTable
          data={this.props.cards.chargedList}
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
          loading={this.props.cards.chargesList_loading}
        />


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
    ...CARDS(dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PaymentHistory));
