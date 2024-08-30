import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromRAPID = async (url) => {
  
  const options = {
    headers: {
      // accept: "application/json",
      // Authorization: "Bearer " + ENV_VARS.RAPID_API_KEY,
      url: url,
      'x-rapidapi-key':ENV_VARS.RAPID_API_KEY,
    'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
    },
  
  };

  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data from RAPID" + response.statusText);
  }
  return response.data;
};
