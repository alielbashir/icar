import env from "react-dotenv";

const url = env.BACKEND_ADDRESS;

const getCars = () => {
  return fetch(url + "/cars").then((data) => data.json());
};
