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
    default:
      return state;
  }
}
