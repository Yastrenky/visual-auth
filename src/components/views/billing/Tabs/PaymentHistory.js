import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import format from '../../../../assets/format'
import { USERS, CARDS, ALERTS } from '../../../../actions';
import styles from '../../../../styles';
import Icon from '@material-ui/core/Icon';
import { ChargeInfo, RefundInfo } from '../sourceData';

class PaymentHistory extends PureComponent {

  getInfo = (id, type) => {
    if (type === 'CHARGE') {
      this.props.getCharge(id, (chargeResp) => {
        this.props.showAlert('Source Details', <ChargeInfo charge={chargeResp} />)
      })
    }
    if (type === 'REFUND') {
      this.props.getRefund(id, (refundResp) => {
        this.props.showAlert('Refund Details', <RefundInfo refund={refundResp} />)
      })
    }
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <ReactTable
          data={this.props.cards.chargedList}
          columns={[
            {
              Header: "ID",
              accessor: "id",
              show: false
            },
            {
              Header: "Posted",
              id: "date",
              accessor: t => format.formatStripeDate(t.date)
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
              Header: 'Type',
              id: 'object',
              accessor: s => s.object.toUpperCase(),
              getProps: (state, rowInfo) => {
                if (rowInfo && rowInfo.row && rowInfo.row.object === 'CHARGE') {
                  return {
                    style: { backgroundColor: '#16a5168f', opacity: '0.8', fontSize: '12px' },
                  }
                }
                if (rowInfo && rowInfo.row && rowInfo.row.object === 'REFUND') {
                  return {
                    style: { backgroundColor: '#ccc6129c', opacity: '0.8', fontSize: '12px' },
                  }
                }
                return {};
              },
            },
            {
              Header: "Status",
              id: 'status',
              accessor: s => s.status.toUpperCase()
            },
            {
              Header: " ",
              id: 'click-me-button',
              Cell: ({ row }) => <Icon className={classes.icon} color="secondary" style={{ fontSize: 22, margin: 0, cursor: 'pointer' }} onClick={(e) => this.getInfo(row.id, row.object)}>info-circle</Icon>,
              width: 50
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
    ...CARDS(dispatch),
    ...ALERTS(dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PaymentHistory));
