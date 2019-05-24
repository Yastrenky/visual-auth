const initialState = () => ({
  list: [],
  loadingInvoices: false
});

const update = (state, { data }) => ({
  ...state,
  list: data,
  loadingInvoices: false
});

const update_inv_loading = (state, { status }) => ({
  ...state,
  loadingInvoices: status
});

function invoicesReducer (state = initialState(), action) {
  switch (action.type) {
    case "UPDATE_INV":
      return update(state, action)
    case "UPDATE_INV_STATUS":
      return update_inv_loading(state, action)
    default:
      return state;
  }
};
export default invoicesReducer;