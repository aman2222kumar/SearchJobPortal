import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./Redux_store/api";
function App() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.jobListingData);

  useEffect(() => {
    dispatch(fetchData({ limit: 10, offset: 0 }));
  }, [dispatch]);
  console.log(data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div className="App"></div>;
}

export default App;
