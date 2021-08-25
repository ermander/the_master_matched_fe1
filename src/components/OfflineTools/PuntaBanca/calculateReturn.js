export const calculateReturn = ({
  odd,
  lay,
  stake,
  bonus,
  commissions,
  unbalancedBet,
}) => {
  let value;
  let realStake;
  let layStake;
  let profitOne;
  let profitTwo;

  if (stake === null || stake.stake === "") {
    realStake = 0;
  } else {
    realStake = stake.stake;
  }

  if (odd === null || lay === null) {
    console.log("Devi inserire entrambe le quote!");
    value = "Devi inserire entrambe le quote!";
  } else if (stake === null && bonus === null) {
    console.log("Devi inserire almeno uno stake");
    value = "Devi inserire almeno uno stake";
  } else {
    if (bonus === null || bonus === "") {
      layStake =
        (parseFloat(odd.odd) * parseFloat(realStake)) /
        (parseFloat(lay.lay) -
          parseFloat(commissions === null ? 0.05 : commissions.commissions));

      if (unbalancedBet !== null) {
        if (unbalancedBet > 100) {
          const unbalancedBetPercentage = unbalancedBet - 100;
          layStake = layStake + (layStake / 100) * unbalancedBetPercentage;
        }
        if (unbalancedBet < 100) {
          const unbalancedBetPercentage = Math.abs(unbalancedBet - 100);
          layStake = layStake - (layStake / 100) * unbalancedBetPercentage;
        }
      }
      layStake = layStake.toFixed(2);

      //a) Profit if back bet wins:
      // Profit = back stake * (back bet odds – 1) – lay stake * (lay bet odds – 1)
      profitOne =
        parseFloat(realStake) * parseFloat(odd.odd - 1) -
        parseFloat(layStake) * parseFloat(lay.lay - 1);
      // b) Profit if lay bet wins:
      // Profit = lay stake * (1 – commission) – back stake
      profitTwo =
        parseFloat(layStake) *
          (1 -
            parseFloat(commissions === null ? 0.05 : commissions.commissions)) -
        realStake;
      profitOne = profitOne.toFixed(2);
      profitTwo = profitTwo.toFixed(2);
    } else {
      layStake =
        (parseFloat(odd.odd) *
          (parseFloat(realStake) + parseFloat(bonus.bonus))) /
        (parseFloat(lay.lay) -
          parseFloat(commissions === null ? 0.05 : commissions.commissions));

      if (unbalancedBet !== null) {
        if (unbalancedBet > 100) {
          const unbalancedBetPercentage = unbalancedBet - 100;
          layStake = layStake + (layStake / 100) * unbalancedBetPercentage;
        }
        if (unbalancedBet < 100) {
          const unbalancedBetPercentage = Math.abs(unbalancedBet - 100);
          layStake = layStake - (layStake / 100) * unbalancedBetPercentage;
        }
      }
      layStake = layStake.toFixed(2);

      // a) Profit if free bet wins:
      // Profit = free bet value * back odds – lay stake * (lay odds – 1)
      profitOne =
        (parseFloat(realStake) + parseFloat(bonus.bonus)) *
          parseFloat(odd.odd) -
        parseFloat(layStake) * parseFloat(lay.lay - 1) -
        parseFloat(realStake);
      // b) Profit if lay bet wins:
      // Profit = lay stake * (1 – commission) – back stake
      profitTwo =
        parseFloat(layStake) *
          (1 -
            parseFloat(commissions === null ? 0.05 : commissions.commissions)) -
        parseFloat(realStake);

      profitOne = profitOne.toFixed(2);
      profitTwo = profitTwo.toFixed(2);
    }
  }

  return {
    value,
    layStake,
    profitOne,
    profitTwo,
  };
};
