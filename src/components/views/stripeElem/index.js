import React, { PureComponent } from 'react';
import {
  injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement
} from 'react-stripe-elements';
import { USERS, CARDS, ALERTS } from '../../../actions';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './stripe.css'
import styles from '../../../styles'

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
      }
    }
  }
};

class CheckoutForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardholder: null,
      loading: false,
    };
  }

  cardholderHandler = (ev) => {
    this.setState({ cardholder: ev.target.value.toUpperCase() })
  }

  cleanForm = () => {
    this.cardNumber.clear();
    this.carExp.clear();
    this.cardCVC.clear();
    this.cardPostal.clear();
    this.setState({ cardholder: null })
  }

  submit = async (ev) => {
    ev.preventDefault();

    const { state: { cardholder }, props: { stripe, users, addCard, getCards, showAlert }} = this
    const { token, error } = await stripe.createToken({ name: cardholder })

    if (!cardholder) {
      showAlert('Card Error', 'Please enter cardholder name')
    }
    if (error) {
      showAlert('Cardholder Error', error.message)
    }

    if (token) {
      this.setState({ loading: true })
      const succees = await addCard(users.customerid, token.id)

      if (succees) {
        await getCards();
        this.cleanForm();
      }
      this.setState({ loading: false })
    } else {
      showAlert('Card Error', 'Unable to create token for cardholder')
    }

  }

  render() {
    const { classes } = this.props;

    return (
      <div className="checkout">
        <p>Save your cards to have more options to pay your invoices</p>
        <div>
          <form>
            <input className="StripeElement Cardholder" placeholder="CARDHOLDER" onChange={this.cardholderHandler} value={this.state.cardholder || ""} />
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

function mapStateToProps(state) {
  return {
    users: state.users,
    cards: state.cards,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    ...USERS(dispatch),
    ...CARDS(dispatch),
    ...ALERTS(dispatch),
  }
}

export default injectStripe(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)));