import server from '../config/index';

export const USERS = (dispatch) => ({
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
        if (response.success) {
          const user = response.user
          dispatch({ type: "LOGIN_USER", user })
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
  logout: async()=>{
    fetch(server + '/logout', { credentials: 'include' })
      .then(response => response.json())
      .then(response => {
        dispatch({ type: "LOGOUT_USER", response })
      })
      .catch(e => console.log(e));
  }
});

