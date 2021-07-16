export const mainReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        isUserLogged: true,
      };

    case "OPEN_DUTCHER_FILTER_MODAL":
      return {
        ...state,
        showDutcherFilterModal: true,
      };
      
    case "CLOSE_DUTCHER_FILTER_MODAL":
      return {
        ...state,
        showDutcherFilterModal: false,
        dutcherFilters: action.payload
      };
    
    case "SYMPLE_CLOSE_DUTCHER_FILTER_MODAL":
      return {
        ...state, 
        showDutcherFilterModal: false
      }

    default:
      return state;
  }
};
