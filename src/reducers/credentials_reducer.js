const initialState = () => ({
  key: null
});

const saveKey = (state, { key }) => ({
  ...state,
  key
});



const credentials = (state = initialState(), action) => {
  switch (action.type) {
    case "CHARGE_KEY":
      return saveKey(state, action)
    default:
      return state;
  }
};
export default credentials;