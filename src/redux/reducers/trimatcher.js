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
    default:
      return state;
  }
}
