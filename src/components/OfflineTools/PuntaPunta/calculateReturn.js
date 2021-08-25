export const calculateReturn = ({
  oddOne,
  oddTwo,
  stake,
  bonus,
  unbalancedBet,
}) => {
  let value;
  let realStake;
  let coverBet;
  let profitOne;
  let profitTwo;

  if (stake === null || stake.stake === "") {
    realStake = 0;
  } else {
    realStake = stake.stake;
  }

  if (oddOne === null || oddTwo === null) {
    value = "Devi inserire entrambre le quote";
  } else if (stake === null && bonus === null) {
    value = "Devi inserire almeno uno stake";
  } else {
    if (bonus === null || bonus === "") {
      coverBet =
        (parseFloat(oddOne.oddOne) * parseInt(realStake)) /
        parseFloat(oddTwo.oddTwo);
      console.log(coverBet);
      if (unbalancedBet !== null) {
        console.log("No bonus");
        if (unbalancedBet > 100) {
          const unbalancedBetPercentage = parseFloat(unbalancedBet) - 100;
          coverBet =
            parseFloat(coverBet) +
            (parseFloat(coverBet) / 100) * parseFloat(unbalancedBetPercentage);
        }
        if (unbalancedBet < 100) {
          const unbalancedBetPercentage = Math.abs(unbalancedBet - 100);
          coverBet =
            parseFloat(coverBet) -
            (parseFloat(coverBet) / 100) * parseFloat(unbalancedBetPercentage);
        }
        coverBet = parseInt(coverBet);
      }

      // Profit if oddOne wins
      profitOne =
        parseInt(realStake) * parseFloat(oddOne.oddOne) -
        parseInt(realStake) -
        parseInt(coverBet);
      // Profit if oddTwo wins
      profitTwo =
        parseInt(coverBet) * parseFloat(oddTwo.oddTwo) -
        parseInt(coverBet) -
        parseInt(realStake);

      profitOne = profitOne.toFixed(2);
      profitTwo = profitTwo.toFixed(2);
    } else {
      coverBet =
        ((parseInt(realStake) + parseInt(bonus.bonus)) *
          parseFloat(oddOne.oddOne)) /
        parseFloat(oddTwo.oddTwo);

      if (unbalancedBet !== null) {
        console.log(unbalancedBet);
        console.log("entro");
        if (unbalancedBet > 100) {
          const unbalancedBetPercentage = unbalancedBet - 100;
          coverBet = coverBet + (coverBet / 100) * unbalancedBetPercentage;
          console.log(coverBet);
        }
        if (unbalancedBet < 100) {
          const unbalancedBetPercentage = Math.abs(unbalancedBet - 100);
          coverBet = coverBet - (coverBet / 100) * unbalancedBetPercentage;
          console.log(coverBet);
        }
        console.log(coverBet);

        // Profit if oddOne wins
        profitOne =
          (parseInt(realStake) + parseInt(bonus.bonus)) *
            parseFloat(oddOne.oddOne) -
          parseInt(realStake) -
          parseInt(coverBet);
        // Profit if oddTwo wins
        profitTwo =
          parseInt(coverBet) * parseFloat(oddTwo.oddTwo) -
          parseInt(coverBet) -
          parseInt(realStake);

        profitOne = profitOne.toFixed(2);
        profitTwo = profitTwo.toFixed(2);
        coverBet = parseInt(coverBet);
      }
    }
  }
  return {
    value,
    coverBet,
    profitOne,
    profitTwo,
  };
};
