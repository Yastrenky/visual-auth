const initialState = () => ({
  imageName: ''
});

const changeImageProfile = (state, { image }) => ({
  ...state,
  imageName: image
});



const usersProfileReducer = (state = initialState(), action) => {
  switch (action.type) {
    case "CHANGE_IMAGE":
      return changeImageProfile(state, action)
    default:
      return state;
  }
};
export default usersProfileReducer;