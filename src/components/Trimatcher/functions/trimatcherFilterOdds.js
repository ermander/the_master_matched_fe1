export const trimatcherFilterOdds = (options, odds, firstBookmaker) => {
  console.log(options, firstBookmaker, odds);
  // USER MUST CHOSE A PRIMARY BOOKMAKER!!
  // Filtering by min odd
  if (options.minOdd !== null) {
    odds = odds.filter((odd) => {
      if (
        odd.book_one.toLowerCase() === firstBookmaker.toLowerCase() &&
        parseFloat(odd.odd_one) >= parseFloat(options.minOdd)
      ) {
        return { ...odd };
      }
      if (
        odd.book_two.toLowerCase() === firstBookmaker.toLowerCase() &&
        parseFloat(odd.odd_two) >= parseFloat(options.minOdd)
      ) {
        return { ...odd };
      }
      if (
        odd.book_three.toLowerCase() === firstBookmaker.toLowerCase() &&
        parseFloat(odd.odd_three) >= parseFloat(options.minOdd)
      ) {
        return { ...odd };
      }
    });
  }
  // Filtering by max odd
  if (options.maxOdd !== null) {
    odds = odds.filter((odd) => {
      if (
        odd.book_one.toLowerCase() === firstBookmaker.toLowerCase() &&
        parseFloat(odd.odd_one) <= parseFloat(options.maxOdd)
      ) {
        return { ...odd };
      }
      if (
        odd.book_two.toLowerCase() === firstBookmaker.toLowerCase() &&
        parseFloat(odd.odd_two) <= parseFloat(options.maxOdd)
      ) {
        return { ...odd };
      }
      if (
        odd.book_three.toLowerCase() === firstBookmaker.toLowerCase() &&
        parseFloat(odd.odd_three) <= parseFloat(options.maxOdd)
      ) {
        return { ...odd };
      }
    });
  }

  // Filtering by date
  // Deleting odds with no data or time specified
  odds = odds.filter(
    (odd) => odd.start_date !== undefined || odd.start_time !== undefined
  );

  const initialDate = new Date(options.initialDate);
  const finalDate = new Date(options.finalDate);

  // Creating a valid date format
  odds = odds.map((odd) => {
    let date = new Date();
    date.setFullYear(
      parseInt(odd.start_date.split("/")[2]),
      parseInt(odd.start_date.split("/")[1] - 1),
      parseInt(odd.start_date.split("/")[0])
    );
    date.setHours(parseInt(odd.start_time.split(":")[0]));
    date.setMinutes(parseInt(odd.start_time.split(":")[0]));
    return {
      ...odd,
      date,
    };
  });

  // Filtering by start date
  odds = odds.filter((odd) => odd.date.valueOf() >= initialDate.valueOf());
  // Filtering by end date
  odds = odds.filter((odd) => odd.date.valueOf() <= finalDate.valueOf());
  // Returning the results
  console.log(odds.length);
  return odds;
};
