const initialState = () => ({
  acces: false,
  id: null,
  name: null,
  email: null,
  password: null,
  imageName: null,
  customerid: null
});

const signup = (state, { device }) => ({
  ...state,
  devices: state.devices.concat(device)
});

const update = (state, { devices }) => ({
  ...state,
  devices
});

const remove = (state, { device }) => ({
  ...state,
  ...initialState()
});

const login = (state, { user }) => ({
  ...state,
  acces: true,
  id: user._id,
  name: user.username,
  email: user.email,
  password: user.password,
  imageName: user.imageName,
  customerid: user.stripeCustId
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
    case "SIGNUP_USER":
      return signup(state, action)
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