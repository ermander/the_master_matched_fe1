import { logos } from "../../Utils/bookmakersLogos";
import OpenDutcherMatchInfoModal from "../Dutcher/OpenDutcherMatchInfoModal"

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

export const fetchOdds = async (showDutcherMatchInfoModal) => {
  try {
    const response = await fetch(
      "https://odds-and-db-be-server.herokuapp.com/google-odds/dutcher-odds"
    );
    const parsedResponse = await response.json();
    let odds = parsedResponse.map((odd) => {
      console.log(odd.book_one, odd.book_two)
      return {
        ...odd,
        event: odd.home + " vs " + odd.away,
        roi: odd.roi.toFixed(2),
        tableRoi: odd.roi.toFixed(2) + "%",
        book_one_image: (
          <img src={logos[odd.book_one.toLowerCase()]} alt={logos[odd.book_one.toLowerCase()] + " logo"} />
        ),
        book_two_image: (
          <img src={logos[odd.book_two.toLowerCase()]} alt={logos[odd.book_two.toLowerCase()] + " logo"} />
        ),
        book_one: odd.book_one.toLowerCase(),
        book_two: odd.book_two.toLowerCase(),
        match_start: odd.start_date + ", " + odd.start_time,
        openMatchInfoModal: <OpenDutcherMatchInfoModal matchInfo={odd} />,
      };
    });
    odds.sort((a, b) => {
      return b.percentageRoi - a.percentageRoi;
    });
    return odds;
  } catch (error) {
    console.log(error);
    return error;
  }
};
