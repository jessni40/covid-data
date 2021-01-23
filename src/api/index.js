// functions fetches data we need
import axios from "axios";

const url = "https://covid19.mathdro.id/api";

// async awaits
export const fetchData = async (country) => {
  let dynamicURL = url;

  if (country) {
    dynamicURL = `${url}/countries/${country}`;
  }
  try {
    // Destructuring used here. Same as response.data.
    // const modifiedData = {
    //   confirmed: data.confirmed,
    //   recovered: data.recovered,
    //   deaths: data.deaths,
    //   lastUpdate: data.lastUpdate,
    // };

    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(dynamicURL);
    // const response = await axios.get(url);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

//
export const fetchDailyData = async () => {
  try {
    // daily data
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;

    // console.log("axios: " + axios.get(`${url}/daily`));
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    // const response = await axios.get(`${url}/countries`);
    // console.log(response)
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
