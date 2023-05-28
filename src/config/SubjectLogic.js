import axios from "axios";
import { BASE_URL } from "../base_url";
export const getSubjId = async (name) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/subject`);
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name.toLowerCase()) {
        return data[i]._id;
      }
    }
    return "";
  } catch (error) {
    return "";
  }
};
