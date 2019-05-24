const initialState = () => ({
  acces: false,
  id: null,
  name: null,
  email: null,
  imageName: null,
  customerid: null
});

const update = (state, { user }) => ({
  ...state,
  id: user._id,
  name: user.username,
  email: user.email,
  imageName: user.imageName,
  customerid: user.stripeCustId
});

const remove = (state, { user }) => ({
  ...state,
  ...initialState()
});

const login = (state) => ({
  ...state,
  acces: true,
});

const update_user_img = (state, { value }) => ({
  ...state,
  imageName: value,
});

const logout = (state, { device }) => (
  {
    ...state,
    ...initialState()
  })

function usersReducer(state = initialState(), action) {
  switch (action.type) {
    case "LOGIN_USER":
      return login(state, action)
    case "UPDATE_USER":
      return update(state, action)
    case "REMOVE_USER":
      return remove(state, action)
    case "LOGOUT_USER":
      return logout(state, action)
    case "UPDATE_USER_IMG":
      return update_user_img(state, action)
    default:
      return state;
  }
};
export default usersReducer;