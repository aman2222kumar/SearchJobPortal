import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./Redux_store/api";

import { Button, Container, Grid, Typography, Box } from "@mui/material";
import "./App.css";
import SingleSelectDropDown from "./filterComponents/singleSelect";
import MultipleSelectDropDown from "./filterComponents/multipleSelect";
function App() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.jobListingData);
  const list_of_data_jd = data?.jdList;
  const [expandedItem, setExpandedItem] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [minExpValue, setMinExpValue] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [stateOfTotalCount, setCount] = useState(0);
  const [roles, setRoles] = useState([]);
  const [minBasePay, setBasePay] = useState(null);
  const loader = useRef(null);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };
    const loaderRef = loader.current;
    const observer = new IntersectionObserver(handleObserver, options);
    if (loaderRef) {
      observer.observe(loader.current);
    }

    return () => {
      if (loaderRef) {
        observer.unobserve(loaderRef);
      }
    };
  }, []);
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  console.log(list_of_data_jd);
  const list_min_exp = list_of_data_jd
    ?.map((item) => item.minExp)
    .sort((a, b) => a - b);
  const uniqueSetMinExp = new Set(list_min_exp);

  // Convert the Set back to an array

  const unique_list_minExp = Array.from(uniqueSetMinExp).map((exp) => ({
    value: exp,
    label: exp !== null ? exp : "",
  }));

  console.log(list_of_data_jd);
  useEffect(() => {
    dispatch(fetchData({ limit: 10, offset: page * 10 }));
  }, [dispatch, page]);

  const handleExpand = (id) => {
    setExpandedItem(id === expandedItem ? null : id);
  };

  //list of location
  const list_location = list_of_data_jd
    ?.map((item) => item.location)
    .sort((a, b) => a - b);
  const uniqueSetLocation = new Set(list_location);

  // Convert the Set back to an array
  // const unique_list_location = Array?.from(uniqueSetLocation);
  const unique_list_location = Array.from(uniqueSetLocation).map(
    (location) => ({
      value: location,
      label: location !== null ? location : "",
    })
  );

  //based on roles
  const list_roles = list_of_data_jd
    ?.map((item) => item?.jobRole)
    .sort((a, b) => a - b);
  const uniqueSetRoles = new Set(list_roles);

  // Convert the Set back to an array
  const unique_list_jobroles = Array.from(uniqueSetRoles).map((role) => ({
    value: role,
    label: role !== null ? role : "",
  }));

  //based on min salary
  const list_salary = list_of_data_jd
    ?.map((item) => item?.minJdSalary)
    .sort((a, b) => a - b);
  const uniqueSetSalary = new Set(list_salary);

  // Convert the Set back to an array
  const unique_list_minSalary = Array.from(uniqueSetSalary).map((salary) => ({
    value: salary,
    label: salary !== null ? salary + "L" : "",
  }));

  function handleCompanyChange(e) {
    setCompanyName(e.target.value);
  }
  function handleExpChange(selectedOption) {
    setMinExpValue(selectedOption); // Update selected option
  }
  const handleLocationChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedLocations(selectedValues);
  };
  const handleRoleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setRoles(selectedValues);
  };
  function handleBaseChange(selectedOption) {
    setBasePay(selectedOption); // Update selected option
  }

  useEffect(() => {
    // Filter data based on minExpValue if it's selected, otherwise render all data
    const filterData =
      minExpValue && minExpValue?.value !== null
        ? list_of_data_jd?.filter((item) => item?.minExp === minExpValue.value)
        : selectedLocations && selectedLocations?.length > 0
        ? list_of_data_jd?.filter((item) =>
            selectedLocations.includes(item.location)
          )
        : companyName && companyName?.trim() !== ""
        ? list_of_data_jd?.filter((item) =>
            item?.companyName
              .toLowerCase()
              .includes(companyName.trim().toLowerCase())
          )
        : roles && roles?.length > 0
        ? list_of_data_jd?.filter((item) => roles.includes(item.jobRole))
        : minBasePay && minBasePay?.value !== null
        ? list_of_data_jd?.filter(
            (item) => item?.minJdSalary === minBasePay?.value
          )
        : list_of_data_jd;
    setFilteredData(filterData);
    setCount(
      filteredData?.length > 0 ? filteredData?.length : list_of_data_jd?.length
    );
  }, [
    list_of_data_jd,
    minExpValue,
    selectedLocations,
    companyName,
    filteredData,
    roles,
    minBasePay,
  ]);
  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <div className="header_title">
        <p className="title">Search Jobs</p>
        <span>
          <sup>{stateOfTotalCount}</sup>
        </span>
      </div>

      <main className="main_container">
        <section className="search_filter_menu_container">
          <SingleSelectDropDown
            data={unique_list_minExp}
            placeholderText={"Min Experience Required"}
            value={minExpValue}
            onDataChange={handleExpChange}
          />

          <div className="inputfieldContainer">
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyChange}
              placeholder="search company name"
            ></input>
          </div>
          <MultipleSelectDropDown
            data={unique_list_location}
            placeholderText={"Based on Location"}
            onDataChange={handleLocationChange}
          />
          <MultipleSelectDropDown
            data={unique_list_jobroles}
            placeholderText={"Based on Role"}
            onDataChange={handleRoleChange}
          />
          <SingleSelectDropDown
            data={unique_list_minSalary}
            placeholderText={"Min base pay"}
            value={minBasePay}
            onDataChange={handleBaseChange}
          />
          {/* Add more select menus for work type, tech stack, role, and min base pay */}
        </section>
        <section className="result">
          <Container className="result_container">
            <Grid container spacing={3}>
              {filteredData !== null
                ? filteredData?.map((item) => (
                    <Grid item xs={4} key={item?.jdUid}>
                      <Box
                        boxShadow={2}
                        borderRadius={8}
                        border={1}
                        borderColor="primary.main"
                        p={2}
                      >
                        <p className="job_title">
                          <span>Job Title:</span>&nbsp;
                          <span>{item?.jobRole || "-"}</span>
                        </p>
                        <p className="company_name">
                          <span>Company Name:</span>&nbsp;
                          <span>{item?.companyName || "-"}</span>
                        </p>
                        <p className="location">
                          <span>Location:</span>&nbsp;
                          <span>{item?.location || "-"}</span>
                        </p>
                        <Typography
                          variant="body2"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleExpand(item?.jdUid)}
                        >
                          {expandedItem === item?.jdUid
                            ? item?.jobDetailsFromCompany
                            : `${item?.jobDetailsFromCompany?.slice(0, 100)}${
                                item?.jobDetailsFromCompany?.length > 100
                                  ? "..."
                                  : ""
                              }`}
                        </Typography>
                        <p className="experience_required">
                          <span>Experience Required:</span>&nbsp;
                          <span>
                            {" "}
                            {item?.minExp ? `${item?.minExp} years` : "N/A"}
                          </span>
                        </p>
                        <Button className="btn_apply">
                          {" "}
                          <a
                            href={item?.jdLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Apply
                          </a>
                        </Button>
                      </Box>
                    </Grid>
                  ))
                : list_of_data_jd &&
                  list_of_data_jd?.map((item) => (
                    <Grid item xs={4} key={item?.jdUid}>
                      <Box
                        boxShadow={2}
                        borderRadius={8}
                        border={1}
                        borderColor="primary.main"
                        p={2}
                      >
                        <p className="job_title">
                          <span>Job Title:</span>&nbsp;
                          <span>{item?.jobRole || "-"}</span>
                        </p>
                        <p className="company_name">
                          <span>Company Name:</span>&nbsp;
                          <span>{item?.companyName || "-"}</span>
                        </p>
                        <p className="location">
                          <span>Location:</span>&nbsp;
                          <span>{item?.location || "-"}</span>
                        </p>
                        <Typography
                          variant="body2"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleExpand(item?.jdUid)}
                        >
                          {expandedItem === item?.jdUid
                            ? item?.jobDetailsFromCompany
                            : `${item?.jobDetailsFromCompany?.slice(0, 100)}${
                                item?.jobDetailsFromCompany?.length > 100
                                  ? "..."
                                  : ""
                              }`}
                        </Typography>
                        <p className="experience_required">
                          <span>Experience Required:</span>&nbsp;
                          <span>{item?.minExp || "-"} years</span>
                        </p>

                        <Button className="btn_apply">
                          <a
                            href={item?.jdLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Apply
                          </a>
                        </Button>
                      </Box>
                    </Grid>
                  ))}
              <div ref={loader}></div>
            </Grid>
          </Container>
        </section>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
