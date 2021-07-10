export const mainReducer = (state, action) => {
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
