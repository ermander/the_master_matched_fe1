export default function (state = {}, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        isUserLogged: true,
      };
    default:
      return state;
  }
};
