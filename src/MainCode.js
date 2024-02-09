import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import SingleCard from "./SingleCard";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  setClickedSearch,
  setJourneyType,
  setDates,
  setCountry,
  setFromCities,
  setFromTo,
  setToCities,
  setStateReturnDate,
  setValue,
  setSearchResults,
  setSearchValue,
} from "./flightSlice";

import "./index.css";

const countriesData = {
  India: ["Delhi", "Mumbai", "Hyderabad", "Chennai", "Banglore"],

  USA: ["Austin", "Boston", "Portland", "Denver", "New York"],
  UK: ["London", "Oxford", "Liverpool", "Bristol", "Plymouth"],
};

const countriesKeys = Object.keys(countriesData);

const MainCode = () => {
  const journeyType = useSelector((state) => state.counter.journeyType.payload);

  const stateReturnDate = useSelector(
    (state) => state.counter.stateReturnDate.payload
  );
  console.log("StateRD", stateReturnDate);
  const clickedSearch = useSelector((state) => state.counter.clickedSearch);
  console.log("StateCli", clickedSearch);
  const dates = useSelector((state) => state.counter.dates);
  console.log("Satedates", dates);
  const country = useSelector((state) => state.counter.country);
  console.log("Country", country);
  const fromCities = useSelector((state) => state.counter.fromCities.payload);
  console.log("🚀 ~ file: MainCode.js:37 ~ MainCode ~ fromCities:", fromCities);
  const fromTo = useSelector((state) => state.counter.fromTo);
  const toCities = useSelector((state) => state.counter.toCities.payload);
  const value = useSelector((state) => state.counter.value);
  const searchResults = useSelector(
    (state) => state.counter.searchResults.payload
  );
  const searchValue = useSelector((state) => state.counter.searchValue.payload);
  // const debounceTime = useSelector((state) => state.counter.debounceTime.payload);
  const dispatch = useDispatch();
  // const [value, setValue] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [searchValue, setSearchValue] = useState("");
  console.log("Share Results", searchResults);

  console.log("CountriesKeys", countriesKeys);
  const [debounceTime, setDebounceTime] = useState(null);

  const debounceSearch = (each, debounceTimeout) => {
    if (debounceTime) {
      clearTimeout(debounceTime);
    }
    const timeOut = setTimeout(() => {
      dispatch(setValue(each));
    }, debounceTimeout);
    setDebounceTime(timeOut);
  };

  return (
    <div className="flex flex-col  p-6 main-code">
      <div className=" p-4 flex flex-col ">
        <div>
          <Form className="flex flex-row ">
            <div className=" mr-[500px]">
              <Form.Group>
                <Form.Label className="text-[20px]">
                  Select Journey Type
                </Form.Label>
                <Form.Select
                  onChange={(e) => {
                    dispatch(setClickedSearch(false));
                    if (e.target.value === "Single") {
                      dispatch(setJourneyType(e.target.value));

                      // setStateReturnDate(false);

                      dispatch(setStateReturnDate(false));
                    } else {
                      // setJourneyType(e.target.value);
                      // setStateReturnDate(true);
                      dispatch(setJourneyType(e.target.value));
                      dispatch(setStateReturnDate(true));
                    }
                  }}
                >
                  <option>Select Journey Type</option>
                  <option value="Single"> Single</option>
                  <option value="Return">Return</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className=" flex flex-row  justify-between w-[800px]">
              <Form.Group>
                <Form.Label className="text-[20px]">Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dates.startDate}
                  onChange={(e) => {
                    const epoch = new Date(e.target.value);
                    console.log(
                      "Date in epoch",
                      epoch.getDate(),
                      epoch.getMonth() + 1,
                      epoch.getFullYear()
                    );
                    const epochF =
                      epoch.getDate() +
                      "-" +
                      epoch.getMonth() +
                      "-" +
                      epoch.getFullYear();
                    console.log("epochF", epochF);
                    console.log("Date.now()", Date.now());
                    const currentEpoch = new Date();
                    console.log(
                      "Current Epoch",
                      currentEpoch.getDate(),
                      currentEpoch.getMonth() + 1,
                      currentEpoch.getFullYear()
                    );
                    const currentEpochF =
                      currentEpoch.getDate() +
                      "-" +
                      currentEpoch.getMonth() +
                      "-" +
                      currentEpoch.getFullYear();
                    console.log("currentEpochF", currentEpochF);
                    console.log(e.target.value);
                    console.log("epochTime", epochF >= currentEpochF);
                    if (epochF >= currentEpochF)
                      dispatch(setDates({ startDate: e.target.value }));
                    else
                      toast.error(
                        "Start date should be greater than today's date"
                      );
                  }}
                />
              </Form.Group>

              {stateReturnDate && (
                <Form.Group>
                  <Form.Label className="text-[20px]">End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={dates.endDate}
                    onChange={(e) => {
                      const startEpoch = new Date(dates.startDate);
                      const startEpochF =
                        startEpoch.getDate() +
                        "-" +
                        startEpoch.getMonth() +
                        "-" +
                        startEpoch.getFullYear();
                      const endEpoch = new Date(e.target.value);
                      const endEpochF =
                        endEpoch.getDate() +
                        "-" +
                        endEpoch.getMonth() +
                        "-" +
                        endEpoch.getFullYear();
                      console.log("Test", endEpochF >= startEpochF);
                      if (endEpochF >= startEpochF)
                        dispatch(setDates({ endDate: e.target.value }));
                      else
                        toast.error(
                          "End date should be greater than start date"
                        );
                    }}
                    required
                  />
                </Form.Group>
              )}
            </div>
          </Form>
        </div>
        <br />
        <br />
        <div>
          <Form className="flex flex-row ">
            <div className="mr-[490px] ">
              <Form.Group>
                <Form.Label className="text-[20px]">Select Country</Form.Label>

                <div className="flex flex-col">
                  <Form.Control
                    type="search"
                    value={searchValue}
                    placeholder="Select Country"
                    style={{ width: "200px" }}
                    onChange={(e) => {
                      console.log("Search", e.target.value);
                      dispatch(setSearchValue(e.target.value));
                      debounceSearch(e.target.value, 1000);
                      // setValue(e.target.value);
                      console.log("eeeeet", e.target.value);
                      if (e.target.value === "") {
                        dispatch(setSearchResults([]));
                      } else {
                        const searchResults = countriesKeys.filter(
                          (eachSuggestion) =>
                            eachSuggestion
                              .toLowerCase()
                              .includes(e.target.value.toLowerCase())
                        );
                        console.log("SLU", searchResults);
                        dispatch(setSearchResults(searchResults));
                      }

                      // setValue(e.target.value);
                      // await function(

                      //  return  setTimeout(() => {
                      //   setValue(e.target.value);
                      // }, 3000);

                      // )()

                      // processChange(e.target.value);
                    }}
                  />
                  <div className="  w-[200px]">
                    {value !== "" && (
                      <div className="flex flex-col bg-white w-[100%] ">
                        {searchResults.map((each, index) => {
                          return (
                            <p
                              onClick={(e) => {
                                dispatch(setCountry(each));
                                dispatch(setFromCities(countriesData[each]));
                                dispatch(setSearchValue(each));
                                dispatch(setSearchResults([]));
                              }}
                              className="cursor-pointer"
                              key={index}
                            >
                              {each}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </Form.Group>
            </div>
            <div className="flex flex-row  justify-between  w-[800px] ">
              <Form.Group>
                <Form.Label className="text-[20px]">From</Form.Label>
                <Form.Select
                  //   value={journeyType}
                  onChange={(e) => {
                    // setFromTo({ ...fromTo, from: e.target.value });
                    dispatch(setFromTo({ from: e.target.value }));
                    const toCitie = fromCities.filter((each) => {
                      return each !== e.target.value;
                    });

                    // setToCities(toCities);
                    dispatch(setToCities(toCitie));
                  }}
                  required
                >
                  {/* <option value="Single"> Single</option>
                <option value="Return">Return</option> */}
                  <option value="Select From City" className="text-[20px]">
                    Select From City
                  </option>

                  {fromCities?.map((each) => {
                    return <option value={each}>{each}</option>;
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-[20px]">To</Form.Label>
                <Form.Select
                  //   value={journeyType}
                  onChange={(e) => {
                    // setFromTo({ ...fromTo, to: e.target.value });
                    dispatch(setFromTo({ to: e.target.value }));
                  }}
                  required
                >
                  {/* <option value="Single"> Single</option>
                <option value="Return">Return</option> */}
                  <option value="Select To City" className="text-[20px]">
                    Select To City
                  </option>

                  {toCities?.map((each) => {
                    return <option value={each}>{each}</option>;
                  })}
                </Form.Select>
              </Form.Group>
            </div>
            <Form.Group className="ml-[80px] self-center ">
              <Button
                variant="primary"
                onClick={() => {
                  // if(journeyType==="Single"){

                  //   if()

                  // }else if(journeyType==="Return")
                  //  setClickedSearch(true);
                  //               }
                  console.log("Journey Type in OnClick", journeyType);

                  if (!(journeyType === "Single" || journeyType === "Return")) {
                    toast.error("Select Journey Type");
                  } else {
                    if (journeyType === "Single") {
                      if (
                        dates.startDate === "" ||
                        country === "" ||
                        fromTo.from === "" ||
                        fromTo.to === ""
                      ) {
                        toast.error("Please Fill in all the details");
                      } else {
                        // setClickedSearch(true);
                        dispatch(setClickedSearch(true));
                      }
                    } else {
                      if (
                        dates.startDate === "" ||
                        dates.endDate === "" ||
                        country === "" ||
                        fromTo.from === "" ||
                        fromTo.to === ""
                      ) {
                        toast.error("Please Fill in all the details");
                      } else {
                        // setClickedSearch(true);
                        dispatch(setClickedSearch(true));
                      }
                    }
                  }
                }}
              >
                Search Flights
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>

      <div className="flex flex-col  p-4">
        {clickedSearch && (
          <SingleCard journeyType={journeyType} fromTo={fromTo} dates={dates} />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainCode;
