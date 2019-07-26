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
  constructor (props) {
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

    if (this.state.cardholder) {
      this.setState({ loading: true })
      let { token, error } = await this.props.stripe.createToken({ name: this.state.cardholder });
      if (token) {
        this.props.addCard(this.props.users.customerid, token.id, (status, title, message) => {
          if (status) {
            this.props.showAlert(title, message)
          }
          else {
            this.props.getCards();
            this.cleanForm();
          }
          this.setState({ loading: false })
        })
      }
      else {
        this.props.showAlert('Card Error', error.message)
      }
    }
    else {
      this.props.showAlert('Card Error', 'Please enter cardholder name')

    }
  }

  render () {
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

function mapStateToProps (state) {
  return {
    users: state.users,
    cards: state.cards,
  }
};

function mapDispatchToProps (dispatch) {
  return {
    ...USERS(dispatch),
    ...CARDS(dispatch),
    ...ALERTS(dispatch),
  }
}

export default injectStripe(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)));