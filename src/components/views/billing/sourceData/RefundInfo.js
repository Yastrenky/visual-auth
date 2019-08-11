import React from 'react';
import format from '../../../../assets/format'

const RefundInfo = (props) => {
  const refund = props.refund
  return (
    <div>
      <div>
        <div className='charge-refund-info'>
          <span> <p>Creation date: </p><p>{format.formatStripeDate(refund.created)}</p></span>
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

 export default RefundInfo