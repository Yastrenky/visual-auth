import server from '../config/index';
import { cryptr } from '../index'

const USERS = (dispatch) => ({

  login: async (data, alert) => {
    await fetch(server + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then(response => response.json())
      .then(response => {
        // console.log(response)
        if (response.success) {
          sessionStorage.setItem('session', JSON.stringify(cryptr.encrypt(response.sessionID)));
          dispatch({ type: "LOGIN_USER" })
        }
        else {
          alert(true, response.title, response.message)
        }
      })
      .catch(
        (error) => {
          alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
        })
  },

  logout: async () => {
    await fetch(server + '/logout', { credentials: 'include' })
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        sessionStorage.removeItem('session');
        dispatch({ type: "LOGOUT_USER", response })
      })
      .catch(e => console.log(e));
  },

  delete: async (alert) => {
    await fetch(server + '/deleteuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
    }).then(response => response.json())
      .then(response => {
        sessionStorage.removeItem('session');
        alert(true, response.title, response.message)
        dispatch({ type: "LOGOUT_USER", response })
      })
      .catch(
        (error) => {
          alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
        });
  },

  updatePsw: async ({ user_id, currentpassword, newpassword }, alert) => {
    fetch(server + '/changepassword', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user_id,
        password: currentpassword,
        newpassword: newpassword
      }),
      credentials: "include",
    }).then(response => response.json())
      .then(response => {
        alert(true, response.title, response.message)
      })
      .catch(
        (error) => {
          alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
        });
  },

  signup: async (name, email, password, alert) => {
    fetch(server + '/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
    }).then(response => response.json())
      .then(response => {
        alert(true, response.title, response.message)
      })
      .catch((error) => {
        alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
      })
  },

  forgot: async (email, alert) => {
    fetch(server + '/forgot', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
      }),
    }).then(response => response.json())
      .then(response => {
        alert(true, response.title, response.message)
      })
      .catch(
        (error) => {
          alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
        })
  },

  reset: async (token, password, alert) => {
    fetch(server + '/reset/' + token, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        password: password
      }),
    }).then(response => response.json())
      .then(response => {
        alert(true, response.title, response.message)
      })
      .catch(
        (error) => {
          alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
        })
  },

  getSessionID: async (callback) => {
    fetch(server + '/sessionID')
      .then(response => response.json())
      .then(result => {
        callback(result.sessionID)
      })
      .catch(e => {

      });
  },

  veryfyEmail: async (token, alert, error) => {
    console.log(token)
    fetch(server + '/mail_verification/' + token, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(response => {
        if (!response.success) {
          alert(true, response.title, response.message, true)
        }
        else {
          alert(true, response.title, response.message, false)
        }
      })
      .catch(
        (error) => {
          alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.", true)
        })
  }


});

export default USERS;