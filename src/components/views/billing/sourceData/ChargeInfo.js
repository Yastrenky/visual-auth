import React from 'react';
import PaymentIcon from 'react-payment-icons';

const ChargeInfo = (props) => {
  const charge = props.charge
  const source = charge.payment_method_details
  return (
    <div>
      <div>
        {source.card ?
          <div style={{ width: '500px', display: 'inline-flex', justifyContent: 'space-evenly' }}>
            <div>
              <PaymentIcon
                id={source.card.brand === "American Express" ? "amex" : source.card.brand.toLowerCase()}
                style={{ margin: 5, width: 200 }}
                className="payment-icon"
              />
            </div>
            <div className='charge-refund-info'>
              <span><p>Brand:</p><p>{source.card.brand.capitalize()}</p></span>
              <span><p>Country:</p><p>{source.card.country}</p></span>
              <span><p>Expiration:</p><p>{source.card.exp_month}/{source.card.exp_year}</p></span>
              <span><p>Funding:</p><p>{source.card.funding.capitalize()}</p></span>
              <span><p>Number:</p><p>**** **** **** {source.card.last4}</p></span>
            </div>
          </div>
          : null}
      </div>
    </div>
  )
}

export default ChargeInfo