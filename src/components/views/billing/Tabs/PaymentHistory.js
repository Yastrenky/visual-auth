import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import format from '../../../../assets/format'
import { USERS, CARDS, ALERTS } from '../../../../actions';
import styles from '../../../../styles';
import Icon from '@material-ui/core/Icon';

const ChargeInfo = (props) => {
  const charge = props.charge
  const source = charge.payment_method_details

  return (
    <div>
      <div>
        {source.card ?
          <div className='charge-refund-info'>
            <span><p>Brand:</p><p>{source.card.brand.capitalize()}</p></span>
            <span><p>Country:</p><p>{source.card.country}</p></span>
            <span><p>Expiration:</p><p>{source.card.exp_month}/{source.card.exp_year}</p></span>
            <span><p>Funding:</p><p>{source.card.funding.capitalize()}</p></span>
            <span><p>Last4:</p><p>{source.card.last4}</p></span>
          </div>
          : null}
      </div>
    </div>
  )
}

const RefundInfo = (props) => {
  const refund = props.refund
  return (
    <div>
      <div>
        <div className='charge-refund-info'>
          <span> <p>Creation date: </p><p>{formatStripeDate(refund.created)}</p></span>
          <span> <p>Currency: </p><p>{refund.currency}</p></span>
          <span> <p>Amount: </p><p>{format.money(refund.amount.toString())}</p></span>
          <span> <p>Reason: </p><p>{refund.reason.replace(/_/g, " ").capitalize()}</p></span>
          <span> <p>Status: </p><p>{refund.status.capitalize()}</p></span>
          {refund.status === 'failed' ?
            <div>
              <span> <p>Failure reason: </p><p>{refund.failure_reason.replace(/_/g, " ").capitalize()}</p></span>
            </div> : null
          }
        </div>
      </div>
    </div>
  )
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

const formatStripeDate = (unix_timestamp) => {
  var date = new Date(unix_timestamp * 1000);
  var objtime = format.date(date)
  return objtime.date + " || " + objtime.time
}

class PaymentHistory extends PureComponent {

  getInfo = (id, type) => {
    if (type === 'CHARGE') {
      this.props.getCharge(id, (chargeResp) => {
        this.props.showAlert('Charge Details', <ChargeInfo charge={chargeResp} />)
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
              accessor: t => formatStripeDate(t.date)
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
              Cell: ({ row }) => <Icon className={classes.icon} color="secondary" style={{ fontSize: 22, margin: 0 }} onClick={(e) => this.getInfo(row.id, row.object)}>info-circle</Icon>
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
