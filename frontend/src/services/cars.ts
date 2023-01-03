import env from "react-dotenv";
import { Token } from "../components/App/App.types";

const url = env.BACKEND_ADDRESS;

export const getCars = () => {
  console.log("attempting to obtain token locally");
  return fetch(url + "/cars", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        JSON.parse(sessionStorage.getItem("token") as string)?.token
      }`,
    },
  }).then((data) => data.json());
};
