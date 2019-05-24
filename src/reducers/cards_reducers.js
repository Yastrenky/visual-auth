const initialState = () => ({
  chargedList: [],
  chargesList_loading: false,
  cardsList: [],
  cardsList_loading: false
});


const load_card = (state, { cards }) => ({
  ...state,
  cards
});

const save_charges_list = (state, { data }) => ({
  ...state,
  chargedList: data.list,
  chargesList_loading: data.status
});

const save_cards_list = (state, { data }) => ({
  ...state,
  cardsList: data.list,
  cardsList_loading: data.status
});

const update_charged_list_status = (state, { status }) => ({
  ...state,
  chargesList_loading: status
});

const update_cards_list_status = (state, { status }) => ({
  ...state,
  cardsList_loading: status
});


function cardsReducer (state = initialState(), action) {
  switch (action.type) {
    case "GET_CARDS":
      return load_card(state, action)
    case "SAVE_CHARGES_LIST":
      return save_charges_list(state, action)
      case "SAVE_CARDS_LIST":
      return save_cards_list(state, action)
    case "UPDATE_CHARGES_STATUS":
      return update_charged_list_status(state, action)
    case "UPDATE_CARDS_STATUS":
      return update_cards_list_status(state, action)
    default:
      return state;
  }
};
export default cardsReducer;