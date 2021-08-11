import { logos } from "../../Utils/bookmakersLogos";
import OpenTrimatcherMatchInfoModal from "../OpenTrimatcherMatchInfoModal"

export const fetchTrimatcherOdds = async () => {
  try {
    const response = await fetch(
      "https://odds-and-db-be-server.herokuapp.com/google-odds/trimatcher-odds"
    );
    const parsedResponse = await response.json();
    let odds = parsedResponse.map((odd) => {
      return {
        ...odd,
        event: odd.home + " vs " + odd.away,
        roi: odd.roi.toFixed,
        tableRoi: odd.roi.toFixed(2) + "%",
        book_one_image: (
          <img src={logos[odd.book_one]} alt={logos[odd.book_one] + " logo"} />
        ),
        book_two_image: (
          <img src={logos[odd.book_two]} alt={logos[odd.book_two] + " logo"} />
        ),
        book_three_image: (
          <img
            src={logos[odd.book_three]}
            alt={logos[odd.book_three] + " logo"}
          />
        ),
        book_one: odd.book_one.toLowerCase(),
        book_two: odd.book_two.toLowerCase(),
        match_start: odd.start_date + ", " + odd.start_time,
        openTrimatcherInfoModal: <OpenTrimatcherMatchInfoModal matchInfo={odd} />
      };
    });
    odds.sort((a, b) => {
      return b.percentageRoi - a.percentageRoi;
    });
    return odds;
  } catch (error) {
    console.log(error);
  }
};
