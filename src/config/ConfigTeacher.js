import axios from "axios";
import { BASE_URL } from "../base_url";
export const getConfigTeacherId = async (tid) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/confTeacher`);
    for (let i = 0; i < data.length; i++) {
      if (Number(data[i].teacherRefId.tid) === Number(tid)) {
        return data[i]._id;
      }
    }
    return "";
  } catch (error) {
    console.log("unable to get configured teacher id from its tid");
    return "";
  }
};
