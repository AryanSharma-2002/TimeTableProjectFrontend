import axios from "axios";
import { BASE_URL } from "../base_url";
export const getTeacherRefId = async (tid) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/teacher`);
    for (let i = 0; i < data.length; i++) {
      if (data[i].tid === Number(tid)) {
        return data[i]._id;
      }
    }
    return "";
  } catch (error) {
    console.log("unable to get teacher reference id of teacher from its tid");
    return error;
  }
};
