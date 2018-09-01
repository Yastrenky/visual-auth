import React, { Component } from 'react';
import {
  injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement
} from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import server from '../../../config';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './stripe.css'

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

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: 15,
    width: 100,
  }
});

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      cardholder: "",
      loading: false
    };

    this.submit = this.submit.bind(this);
  }

  cardholderHandler = (ev) => {
    this.setState({ cardholder: ev.target.value.toUpperCase() })
  }

  cleanForm = () => {
    this.cardNumber.clear();
    this.carExp.clear();
    this.cardCVC.clear();
    this.cardPostal.clear();
    this.setState({ cardholder: "" })
  }

  async submit(ev) {
    ev.preventDefault();
    this.setState({ loading: true })

    let { token, error } = await this.props.stripe.createToken({ name: this.state.cardholder });
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
          this.cleanForm();
          this.setState({ loading: false })
        })
        .catch((error) => {
          this.setState({ loading: false })
          console.log(error)
        })
    }

    else {
      console.log("Error token", error)
      this.setState({ loading: false })
    }

  }

  render() {
    // console.log(this.state)
    const { classes } = this.props;

    return (
      <div className="checkout">
        <p>Save your cards to have more options to pay your invoices</p>
        <div>
          <form>
            <input className="StripeElement Cardholder" placeholder="CARDHOLDER" onChange={this.cardholderHandler} value={this.state.cardholder} />
            <CardNumberElement {...createOptions()} onReady={el => this.cardNumber = el} />
            <div className="card-info">
              <CardExpiryElement className="card-info-element" {...createOptions()} onReady={el => this.carExp = el} />
              <CardCVCElement className="card-info-element" {...createOptions()} onReady={el => this.cardCVC = el} />
              <PostalCodeElement className="card-info-element" {...createOptions()} placeholder="ZIPCODE" onReady={el => this.cardPostal = el} />
            </div>
            {!this.state.loading ?
              <Button
                onClick={this.submit}
                variant="contained"
                color="primary"
                className={classes.button}>

                Save
             </Button>
              :
              <CircularProgress className={classes.progress} />
            }
          </form>

        </div>

      </div >
    );
  }
}

export default injectStripe(withStyles(styles)(CheckoutForm));