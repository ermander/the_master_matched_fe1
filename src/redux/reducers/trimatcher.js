export default function (state = {}, action) {
  switch (action.type) {
    case "SET_TRIMATCHER_MAIN_ODDS":
      return {
        ...state,
        odds: action.payload,
      };

    case "SET_TRIMATCHER_TEMPORARY_ODDS":
      return {
        ...state,
        temporaryOdds: action.payload,
      };
    case "SET_TRIMATCHER_FIRST_BOOKMAKER":
      return {
        ...state,
        firstBookmaker: action.payload,
      };
    case "SHOW_TRIMATCHER_MATCH_INFO_MODAL":
      return {
        ...state,
        showTrimatcherMatchInfoModal: !state.showTrimatcherMatchInfoModal,
        matchInfo: action.payload,
      };
    default:
      return state;
  }
}
