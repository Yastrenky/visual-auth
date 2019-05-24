import server from '../config/index';

const PROFILE = (dispatch) => ({

  loadProfile: async (alert) => {
    fetch(server + '/profile', { credentials: 'include' })
      .then(response => response.json())
      .then(result => {
        dispatch({ type: "UPDATE_USER", user: result.user })
      })
      .catch(e => {
        alert(true, 'Connection lost', "Server connection lost. Please contact your service provider.")
      });
  },

  updateProfileImage: async (event, alert) => {
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
  },
})

export default PROFILE;