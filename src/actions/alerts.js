const ALERTS = dispatch => ({
  showAlert: async (title, text) => {
    dispatch({ type: "SHOW_ALERT", info: {title, text}})
  },
  closeAlert: async () => {
    dispatch({ type: "CLOSE_ALERT" })
   }
});

export default ALERTS