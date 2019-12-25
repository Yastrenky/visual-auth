import { server } from '../config'

const INVOICES = (dispatch) => ({

  updateInv: async (alert) => {
    dispatch({ type: "UPDATE_INV_STATUS", status: true })
    fetch(server + '/invoices', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        const invoices = result.invoices.data
        console.log(invoices)
        dispatch({ type: "UPDATE_INV", data: invoices })
      })
      .catch(e => {
        alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
      });
  },
})

export default INVOICES;