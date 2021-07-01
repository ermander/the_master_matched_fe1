import { logos } from "../Utils/bookmakersLogos";

export const setBookmaker = (odds, bookmaker) => {
  console.log(bookmaker);
  if (bookmaker === "") {
    return odds;
  } else {
    let filteredOdds = odds.filter(
      (odd) =>
        odd.book_one === bookmaker.toLowerCase() ||
        odd.book_two === bookmaker.toLowerCase()
    );
    return filteredOdds;
  }
};

export const fetchOdds = async() => {
    try {
        const response = await fetch("https://the-master-matched-be-new.herokuapp.com/google-odds/dutcher-odds");
        const parsedResponse = await response.json();
        let odds = parsedResponse.map((odd) => {
            return {
              ...odd,
              event: odd.home + " vs " + odd.away,
              roi: odd.roi.toFixed(2),
              tableRoi: odd.roi.toFixed(2) + "%",
              book_one_image: (<img src={logos[odd.book_one]} alt={logos[odd.book_one] + " logo"}/>),
              book_two_image: (<img src={logos[odd.book_two]} alt={logos[odd.book_two] + " logo"}/>),
              book_one: odd.book_one.toLowerCase(),
              book_two: odd.book_two.toLowerCase(),
              match_start: odd.start_date + ", " + odd.start_time,
            };
        });    
        odds.sort((a, b) => {
            return b.percentageRoi - a.percentageRoi;
        });
        return odds
    } catch (error) {
        console.log(error)
        return error
    }
}
