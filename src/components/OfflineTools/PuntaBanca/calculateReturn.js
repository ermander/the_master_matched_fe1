export const calculateReturn = ({ odd, lay, stake, bonus, commissions }) => {
  let value;
  let layStake;
  let profit;
  if (odd === null || lay === null) {
    console.log("Devi inserire entrambe le quote!");
    value = "Devi inserire entrambe le quote!";
  } else if (stake === null && bonus === null) {
    console.log("Devi inserire almeno uno stake");
    value = "Devi inserire almeno uno stake";
  } else {
    if (bonus === null || bonus === "") {
      layStake =
        (parseFloat(odd.odd) * parseFloat(stake.stake)) /
        (parseFloat(lay.lay) -
          parseFloat(commissions === null ? 0.05 : commissions.commissions));
      layStake = layStake.toFixed(2);
      profit =
        parseFloat(layStake) *
          (1 -
            parseFloat(commissions === null ? 0.05 : commissions.commissions)) -
        parseFloat(stake.stake);
      profit = profit.toFixed(2);
    } else {
      layStake =
        (parseFloat(odd.odd) *
          (parseFloat(stake.stake) + parseFloat(bonus.bonus))) /
        (parseFloat(lay.lay) -
          parseFloat(commissions === null ? 0.05 : commissions.commissions));
      layStake = layStake.toFixed(2);
      profit =
        parseFloat(layStake) *
          (1 -
            parseFloat(commissions === null ? 0.05 : commissions.commissions)) -
        parseFloat(stake.stake);
      profit = profit.toFixed(2);
    }
  }

  return {
    value,
    layStake,
    profit,
  };
};
