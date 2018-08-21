import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import server from '../../../config';
import { withStyles } from '@material-ui/core/styles';

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
    const { classes } = this.props;

    return (
      <div className="checkout">
        <h4>Save your cards to have more options to pay your invoices</h4>
        <CardElement
          {...createOptions()}
        />
        <Button
          onClick={this.submit}
          variant="contained"
          color="primary"
          className={classes.button}>
          Save
        </Button>
      </div>
    );
  }
}

export default injectStripe(withStyles(styles)(CheckoutForm));