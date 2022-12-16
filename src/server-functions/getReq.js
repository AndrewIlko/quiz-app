import axios from "axios";

export const getUserData = async () => {
  let data;
  await axios
    .get("http://localhost:5000/get-user")
    .then((res) => res.data)
    .then((res) => (data = res));
  return data;
};
