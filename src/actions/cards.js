import server from '../config/index';

const CARDS = dispatch => ({

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
          var list = result.charge.data
          var newData = [];

          list.forEach((charge => newData.push({
            date: charge.created,
            card_id: charge.source.id,
            charge_id: charge.id,
            card: charge.source.last4,
            status: charge.status,
            amount: charge.amount,
            currency: charge.currency

          })));
          dispatch({ type: "SAVE_CHARGES_LIST", data: { list: newData, status: false } })
        }
      }).catch(e => {
        console.log(e)
      });
  },

  getCards: async () => {
    dispatch({ type: "UPDATE_CARDS_STATUS", status: true })
    fetch(server + '/getAllCards', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        var newData = [];
        if (!result.err) {
          var list = result.cards.data
          list.forEach((card => newData.push({
            name: card.name,
            id: card.id,
            brand: card.brand,
            card: card.last4,
            date: card.exp_month + "/" + card.exp_year,
            zipcode: card.address_zip
          })));
        }
        dispatch({ type: "SAVE_CARDS_LIST", data: { list: newData, status: false } })
      })
      .catch(e => {
        console.log(e)
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
        callback(false)
      })
      .catch((error) => {
        console.log(error)
        callback( false )
      })
   }
});

export default CARDS