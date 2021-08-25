import { logos } from "../../../Utils/bookmakersLogos";
// import OpenOddsmatcherMatchInfoModal

export const fetchOddsmatcherOdds = async () => {
  try {
    const response = await fetch(
      "https://odds-and-db-be-server.herokuapp.com/google-odds/oddsmatcher-odds"
    );
    //console.log(response);
    if (response.ok) {
    } else {
      return [
        {
          match_start: "No data avaiable",
          nation: "No data avaiable",
          tournament: "No data avaiable",
          event: "No data avaiable",
          market: "No data avaiable",
          book_one_image: "No data avaiable",
          odd_one_type: "No data avaiable",
          odd_one: "No data avaiable",
          odd_two: "No data avaiable",
          odd_two_type: "No data avaiable",
          book_two_image: "No data avaiable",
          tableRoi: "No data avaiable",
        },
      ];
    }
  } catch (error) {
    console.log(error);
  }
};
