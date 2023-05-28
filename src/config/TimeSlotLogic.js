import axios from "axios";
import { BASE_URL } from "../base_url";
export const getTimeSlotIdByStartTime = async (start) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/timeSlot`);
    for (let i = 0; i < data.length; i++) {
      if (parseInt(data[i].start) === start) {
        return data[i]._id;
      }
    }
    return "";
  } catch (error) {
    console.log("unable to get time slot Id by its start time");
    return error;
  }
};
