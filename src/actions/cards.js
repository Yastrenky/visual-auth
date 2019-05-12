import server from '../config/index';

const CARDS = dispatch => ({

  loadCharges: async (customerid, callback) => {
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
          if (newData.length >= 0) {
            callback()
          }
          dispatch({ type: "SAVE_CHARGES_LIST", list: newData })
        }
      }).catch(e => {
        console.log(e)
      });
  }
});

export default CARDS