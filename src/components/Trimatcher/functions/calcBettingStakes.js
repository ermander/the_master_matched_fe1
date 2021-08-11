export const calcBettingStakes = (options) => {
  console.log(options);
  // Stakes 1
  const stakeLay1 =
    options.stakeLay1 !== "" ? options.stakeLay1.stakeLay1 : 100;
  const bonusLay1 = options.bonusLay1 !== "" ? options.bonusLay1.bonusLay1 : 0;
  // Stakes X
  const stakeLayX =
    options.stakeLayX !== "" ? options.stakeLayX.stakeLayX : 100;
  const bonusLayX = options.bonusLayX !== "" ? options.bonusLayX.bonusLayX : 0;
  // Stakes 2
  const stakeLay2 =
    options.stakeLay2 !== "" ? options.stakeLay2.stakeLay2 : 100;
  const bonusLay2 = options.bonusLay2 !== "" ? options.bonusLay2.bonusLay2 : 0;

  // Odd 1
  const odd1 =
    options.odd1 !== "" ? options.odd1 : parseFloat(options.odd_one);
  // Odd X
  const oddX =
    options.oddX !== "" ? options.oddX : parseFloat(options.odd_two);
  // Odd 2
  const odd2 =
    options.odd2 !== "" ? options.odd2 : parseFloat(options.odd_three);
};
