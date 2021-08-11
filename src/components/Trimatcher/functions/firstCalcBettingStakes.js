export const firstCalcBettingStakes = (oddOne, oddTwo, oddThree) => {
  // Calculating roi with oddOne first
  const firstCase = calcFirstCase(
    parseFloat(oddOne),
    parseFloat(oddTwo),
    parseFloat(oddThree)
  );
  const secondCase = calcSecondCase(
    parseFloat(oddOne),
    parseFloat(oddTwo),
    parseFloat(oddThree)
  );
  const thirdCase = calcThirdCase(
    parseFloat(oddOne),
    parseFloat(oddTwo),
    parseFloat(oddThree)
  );
  console.log(firstCase);
  console.log(secondCase);
  console.log(thirdCase);
};

function calcFirstCase(oddOne, oddTwo, oddThree) {
  const contropuntaUno = Math.round((100 * oddOne) / oddTwo);
  const contropuntaDue = Math.round((100 * oddOne) / oddThree);
  const profit = 100 * oddOne - 100 - contropuntaUno - contropuntaDue;
  
  return profit;
}

function calcSecondCase(oddOne, oddTwo, oddThree) {
  const contropuntaUno = Math.round((100 * oddTwo) / oddOne);
  const contropuntaDue = Math.round((100 * oddTwo) / oddThree);
  const profit = 100 * oddTwo - 100 - contropuntaUno - contropuntaDue;
  
  return profit;
}

function calcThirdCase(oddOne, oddTwo, oddThree) {
  const contropuntaUno = Math.round((100 * oddThree) / oddOne);
  const contropuntaDue = Math.round((100 * oddThree) / oddTwo);
  const profit = 100 * oddThree - 100 - contropuntaUno - contropuntaDue;
  
  return profit;
}
