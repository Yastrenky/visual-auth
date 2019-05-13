const initialState = () => ({
  show: false,
  title: 'Undefined',
  text: '...'
});


const show_alert = (state, { info }) => ({
  ...state,
  show: true,
  title: info.title,
  text: info.text
});

const close_alert = (state, { info }) => ({
  ...state,
  ...initialState()
});

function alertsReducer (state = initialState(), action) {
  switch (action.type) {
    case "SHOW_ALERT":
      return show_alert(state, action)
    case "CLOSE_ALERT":
      return close_alert(state, action)
    default:
      return state;
  }
};
export default alertsReducer;