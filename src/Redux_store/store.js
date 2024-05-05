import { configureStore } from "@reduxjs/toolkit";
import searchJobListingReducer from "../Redux_store/slice"; // Import the reducer

// You need to create this reducer

const store = configureStore({
  reducer: {
    jobListingData: searchJobListingReducer,
  },
});

export default store;
