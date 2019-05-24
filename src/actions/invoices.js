import server from '../config/index';

const INVOICES = (dispatch) => ({

  updateInv: async (alert) => {
    dispatch({ type: "UPDATE_INV_STATUS", status: true })
    fetch(server + '/invoices', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        dispatch({ type: "UPDATE_INV", data: result })
      })
      .catch(e => {
        alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
      });
  },
})

export default INVOICES;