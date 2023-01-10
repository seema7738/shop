import axios from "axios";
const bearerToken = `Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo`;
export const apiConfig = axios.create({
  baseURL: "https://api.sheety.co/af35b536915ec576818d468cf2a6505c", // /reactjsTest/products
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
});
