export const calculateReturn = ({ odd, lay, stake, bonus, commissions }) => {
  let value;
  if ((odd || lay) === null) {
    console.log("Devi inserire entrambe le quote!");
    value = "Devi inserire entrambe le quote!";
  }

  if ((stake && bonus) === null) {
    console.log("Devi inserire almeno uno stake");
    value = "Devi inserire almeno uno stake";
  }

  const layStake =
    (parseFloat(odd.odd) * parseFloat(stake.stake)) /
    (parseFloat(lay.lay) - parseFloat(commissions.commissions));

  console.log(layStake);
  return value;
};
