import { server } from '../config'
import ALERTS from './alerts'

const CARDS = dispatch => ({
  addCard: async (customerid, token) => {
    return fetch(server + "/addCard", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        token: token,
        customerid: customerid
      })
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        if (response.err) {
          ALERTS(dispatch).showAlert("Card error", response.err.message)
          return false
        }
        return true
      })
      .catch((e) => {
        ALERTS(dispatch).showAlert("Connection lost", 'Server connection lost. Please contact your service provider. ' + e)
      })
  },

  getCharge: async (chargeId, callback) => {
    await fetch(server + "/getCharge", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        id: chargeId
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.err) {
          ALERTS(dispatch).showAlert("Charge Error", response.err.message)
        }
        else {
          callback(response.charge)
        }
      })
      .catch((e) => {
        ALERTS(dispatch).showAlert("Connection lost", 'Server connection lost. Please contact your service provider. ' + e)
      })
  },

  getRefund: async (refundId, callback) => {
    await fetch(server + "/getRefund", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        id: refundId
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.err) {
          ALERTS(dispatch).showAlert("Refund Error", response.err.message)
        }
        else {
          callback(response.refund)
        }
      })
      .catch((e) => {
        ALERTS(dispatch).showAlert("Connection lost", 'Server connection lost. Please contact your service provider. ' + e)
      })
  },

  loadCharges: async (customerid) => {
    dispatch({ type: "UPDATE_CHARGES_STATUS", status: true })
    fetch(server + '/getCustomerCharges', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        custId: customerid,
      })
    })
      .then(response => response.json())
      .then(result => {
        if (result.err) {
          console.log(result.err.message)
        }
        else {
          // console.log(result)
          var list = result.charge.data
          var charges = [];
          list.forEach((charge => {
            let refunds = charge.refunds.data

            refunds.forEach((refund => {
              charges.push({
                object: refund.object,
                date: refund.created,
                card_id: charge.source.id,
                id: refund.id,
                card: charge.source.last4 ? charge.source.last4 : charge.source.card.last4,
                status: refund.status,
                amount: refund.amount,
                currency: refund.currency,
              })
            }))

            charges.push({
              object: charge.object,
              date: charge.created,
              card_id: charge.source.id,
              id: charge.id,
              card: charge.source.last4 ? charge.source.last4 : charge.source.card.last4,
              status: charge.status,
              amount: charge.amount,
              currency: charge.currency,
            })
          }));
          dispatch({ type: "SAVE_CHARGES_LIST", data: { list: charges, status: false } })
        }
      }).catch(e => {
        // console.log(e)
      });
  },

  getCards: async () => {
    dispatch({ type: "UPDATE_CARDS_STATUS", status: true })
    fetch(server + '/getAllCards', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        var newData = [];
        if (!result.err) {
          var list = result.cards.data
          list.forEach((card => {
            if (card.object === 'card') {
              newData.push({
                name: card.name,
                id: card.id,
                brand: card.brand,
                card: card.last4,
                date: card.exp_month + "/" + card.exp_year,
                zipcode: card.address_zip
              })
            }
          }));
        }
        dispatch({ type: "SAVE_CARDS_LIST", data: { list: newData, status: false } })
      })
      .catch(e => {
        // console.log(e)
      });
  },

  deletCard: async (sourceid, customerid, callback) => {
    fetch(server + "/removeCard", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        sourceid: sourceid,
        customerid: customerid

      })
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        callback(false)
      })
      .catch((error) => {
        console.log(error)
        callback(false)
      })
  },

  chargeCustomer: async (customerid, sourceid, amount, showMessage) => {
    return fetch(server + "/chargeCustomer", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        custId: customerid,
        amount: amount * 100,
        source: sourceid
      })
    })
      .then(response => response.json())
      .then(response => {
        const stripteErrMsg = response?.err?.message
        if (stripteErrMsg) {
          ALERTS(dispatch).showAlert('Server Error', stripteErrMsg)
          return false
        }
        if (response?.charge?.status === "succeeded") {
          return true
        }
        else {
          ALERTS(dispatch).showAlert('Server Error', "Error in payment")
          return false
        }
      })
      .catch((e) => {
        // console.log(e)
        ALERTS(dispatch).showAlert('Server Error', "Error processing payment")
        return false
      })
  }
});

export default CARDS