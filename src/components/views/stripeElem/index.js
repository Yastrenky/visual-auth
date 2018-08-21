import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import server from '../../../config';

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };

    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    if (token) {
      await fetch(server + "/addCard", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          token: token.id,
          customerid: this.props.customerid

        })
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          this.props.getSavedCards();
        })
        .catch((error) => { console.log(error) })
    }

    else console.log("Error token")

  }

  render() {
    // console.log(this.props)
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement
          {...createOptions()}
        />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);