import server from '../config/index';

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

  logout: async () => {
    await fetch(server + '/logout', { credentials: 'include' })
      .then(response => response.json())
      .then(response => {
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
        alert(true, response.title, response.message, 'loguot')
      })
      .catch(
        (error) => {
          alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
        });
  },

   updatePsw: async ({ user_id, currentpassword, newpassword}, alert) =>{
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

  updateProfileImage: async(event , alert) =>{
    var file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('myFile', file, file.name);

      fetch(server + '/uploadprofileimage', {
        method: 'POST',
        body: formData,
        credentials: "include",
      }).then(response => response.json())
        .then(response => {
          alert(true, response.title, response.message)
          dispatch({ type: "UPDATE_USER_IMG", value: response.value })
        })
        .catch(
          (error) => {
            alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
          });
    }
    else {
      console.log("No file selected")
    }
  }
});

export default USERS;