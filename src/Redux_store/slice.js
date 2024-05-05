import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../Redux_store/api"; // Import fetchData action creator

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const searchJobListingSlice = createSlice({
  name: "jobListing",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchJobListingSlice.reducer;
