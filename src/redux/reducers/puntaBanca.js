export default function (state = {}, action) {
  switch (action.type) {
    case "SET_UNBALANCED_BET":
      return {
        ...state,
        unbalancedBet: action.payload,
      };
    case "DELETE_UNBALANCED_BET":
      return {
        ...state,
        unbalancedBet: action.payload,
      };

    default:
      return state;
  }
}
