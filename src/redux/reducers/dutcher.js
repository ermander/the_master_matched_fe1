export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_MAIN_ODDS":
      return {
        ...state,
        odds: action.payload,
      };
    case "ADD_TEMPORARY_ODDS":
      return {
        ...state,
        temporaryOdds: action.payload,
      };
    case "SYMPLE_CLOSE_DUTCHER_FILTER_MODAL":
      return {
        ...state,
        showDutcherFilterModal: false,
      };
    // FIRST BOOKMAKER
    case "SET_FIRST_BOOKMAKER":
      return {
        ...state,
        temporaryOdds: action.payload,
      };
    case "SAVE_FIRST_BOOKMAKER":
      return {
        ...state,
        firstBookmaker: action.payload,
      };
    case "SHOW_DUTCHER_MATCH_INFO_MODAL":
      return {
        ...state,
        showDutcherMatchInfoModal: !state.showDutcherMatchInfoModal,
        matchInfo: action.payload,
      };
    // ODDS FILTERS
    default:
      return state;
  }
}
