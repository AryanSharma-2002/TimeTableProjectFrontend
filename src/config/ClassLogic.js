import axios from "axios";
import { BASE_URL } from "../base_url";
export const getClassId = async (name) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/class`);
    for (let i = 0; i < data.length; i++) {
      if (data[i].className === name.toUpperCase()) {
        return data[i]._id;
      }
    }
    return "";
  } catch (error) {
    console.log("unable to get class Id of class by its name");
    return "";
  }
};
