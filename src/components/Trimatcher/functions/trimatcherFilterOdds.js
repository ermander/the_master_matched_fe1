export const trimatcherFilterOdds = (options, odds, firstBookmaker) => {
  // USER MUST CHOSE A PRIMARY BOOKMAKER!!
  console.log(options, firstBookmaker);

  // Filtering by first bookmaker
  odds = odds.filter((odd) => {
    if (firstBookmaker === "Tutti") return { ...odd };
    if (
      odd.book_one === firstBookmaker ||
      odd.book_two === firstBookmaker ||
      odd.book_three === firstBookmaker
    ) {
      return { ...odd };
    }
  });
  // Filtering by min odd
  // if (firstBookmaker === "Tutti" && options.minOdd !== null) {
  //   odds = odds.filter(
  //     (odd) =>
  //       parseFloat(odd.odd_one) >= parseFloat(options.minOdd) ||
  //       parseFloat(odd.odd_two) >= parseFloat(options.minOdd) ||
  //       parseFloat(odd.odd_three) >= parseFloat(options.minOdd)
  //   );
  // }
  // if (options.minOdd !== null) {
  //   odds = odds.filter((odd) => {
  //     if (
  //       odd.book_one === firstBookmaker &&
  //       parseFloat(odd.odd_one) >= parseFloat(options.minOdd)
  //     ) {
  //       return { ...odd };
  //     }
  //     if (
  //       odd.book_two === firstBookmaker &&
  //       parseFloat(odd.odd_two) >= parseFloat(options.minOdd)
  //     ) {
  //       return { ...odd };
  //     }
  //     if (
  //       odd.book_three === firstBookmaker &&
  //       parseFloat(odd.odd_three) >= parseFloat(options.minOdd)
  //     ) {
  //       return { ...odd };
  //     }
  //   });
  // }
  // // Filtering by max odd
  // if (options.maxOdd !== null) {
  //   odds = odds.filter((odd) => {
  //     if (
  //       odd.book_one === firstBookmaker &&
  //       parseFloat(odd.odd_one) <= parseFloat(options.maxOdd)
  //     ) {
  //       return { ...odd };
  //     }
  //     if (
  //       odd.book_two === firstBookmaker &&
  //       parseFloat(odd.odd_two) <= parseFloat(options.maxOdd)
  //     ) {
  //       return { ...odd };
  //     }
  //     if (
  //       odd.book_three === firstBookmaker &&
  //       parseFloat(odd.odd_three) <= parseFloat(options.maxOdd)
  //     ) {
  //       return { ...odd };
  //     }
  //   });
  // }

  // // Filtering by date
  // // Deleting odds with no data or time specified
  // odds = odds.filter(
  //   (odd) => odd.start_date !== undefined || odd.start_time !== undefined
  // );

  // const initialDate = new Date(options.initialDate);
  // const finalDate = new Date(options.finalDate);

  // // Creating a valid date format
  // odds = odds.map((odd) => {
  //   let date = new Date();
  //   date.setFullYear(
  //     parseInt(odd.start_date.split("/")[2]),
  //     parseInt(odd.start_date.split("/")[1] - 1),
  //     parseInt(odd.start_date.split("/")[0])
  //   );
  //   date.setHours(parseInt(odd.start_time.split(":")[0]));
  //   date.setMinutes(parseInt(odd.start_time.split(":")[0]));
  //   return {
  //     ...odd,
  //     date,
  //   };
  // });

  // // Filtering by start date
  // odds = odds.filter((odd) => odd.date.valueOf() >= initialDate.valueOf());
  // // Filtering by end date
  // odds = odds.filter((odd) => odd.date.valueOf() <= finalDate.valueOf());
  // Returning the results
  odds.map((odd) => console.log(odd.book_one, odd.book_two, odd.book_three));
  return odds;
};
