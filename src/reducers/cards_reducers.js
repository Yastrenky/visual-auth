const initialState = () => ({
  chargedlist: []
});


const load_card = (state, { cards }) => ({
  ...state,
  cards
});

const save_charges_list = (state, { list }) => ({
  ...state,
  chargedlist: list
});


function cardsReducer(state = initialState(), action) {
  switch (action.type) {
    case "GET_CARDS":
      return load_card(state, action)
      case "SAVE_CHARGES_LIST":
      return save_charges_list(state, action)    
    default:
      return state;
  }
};
export default cardsReducer;