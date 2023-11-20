import axios from "axios";

export default async function (url: string) {
  const response = await axios.get(url);
  return response.data;
}
