import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "jobListing/fetchData",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default fetchData;
