import server from '../config/index';

const CREDENTIALS = dispatch => ({

  load: async (alert) => {
    fetch(server + '/getSecret', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        dispatch({ type: "CHARGE_KEY", key: result.publicKey })
      })
      .catch(e => {
        alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
      });
  }
});

export default CREDENTIALS