import { server } from '../config'
import ALERTS from './alerts'

const INVOICES = (dispatch) => ({

  updateInv: async () => {
    dispatch({ type: "UPDATE_INV_STATUS", status: true })
    fetch(server + '/invoices', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        const invoices = result.invoices.data
        dispatch({ type: "UPDATE_INV", data: invoices })
      })
      .catch(e => {
        ALERTS(dispatch).showAlert("Connection lost", "Server connection lost. Unable to load invoices.")
      });
  },
})

export default INVOICES;