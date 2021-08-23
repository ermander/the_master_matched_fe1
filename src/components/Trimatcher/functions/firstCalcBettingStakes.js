export const firstCalcBettingStakes = (oddOne, oddTwo, oddThree) => {
  let rois = [];
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
  rois.push(firstCase, secondCase, thirdCase);
  const max = Math.max(firstCase.profit, secondCase.profit, thirdCase.profit);
  const findMaxIndex = rois.findIndex((element) => element.profit === max);
  console.log(rois[findMaxIndex]);
  return rois[findMaxIndex];
};

function calcFirstCase(oddOne, oddTwo, oddThree) {
  const contropuntaUno = Math.round((100 * oddOne) / oddTwo);
  const contropuntaDue = Math.round((100 * oddOne) / oddThree);
  const profit = 100 * oddOne - 100 - contropuntaUno - contropuntaDue;

  return {
    profit,
    case: "first",
    contropuntaUno: parseInt(contropuntaUno),
    contropuntaDue: parseInt(contropuntaDue),
  };
}

function calcSecondCase(oddOne, oddTwo, oddThree) {
  const contropuntaUno = Math.round((100 * oddTwo) / oddOne);
  const contropuntaDue = Math.round((100 * oddTwo) / oddThree);
  const profit = 100 * oddTwo - 100 - contropuntaUno - contropuntaDue;

  return {
    profit,
    case: "second",
    contropuntaUno: parseInt(contropuntaUno),
    contropuntaDue: parseInt(contropuntaDue),
  };
}

function calcThirdCase(oddOne, oddTwo, oddThree) {
  const contropuntaUno = Math.round((100 * oddThree) / oddOne);
  const contropuntaDue = Math.round((100 * oddThree) / oddTwo);
  const profit = 100 * oddThree - 100 - contropuntaUno - contropuntaDue;

  return {
    profit,
    case: "third",
    contropuntaUno: parseInt(contropuntaUno),
    contropuntaDue: parseInt(contropuntaDue),
  };
}
