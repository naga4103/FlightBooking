import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import "./index.css";

const flightNames = [
  { name: "Indigo", price: 9000 },
  { name: "Jet Airways", price: 8000 },
  { name: "Spice Jet", price: 7000 },
];

const SingleCard = (props) => {
  console.log("props", props);
  const { journeyType, fromTo, dates } = props;

  return (
    <>
      {journeyType === "Single" ? (
        <>
          <div className="single-card">
            <ListGroup>
              {flightNames.map((each, index) => {
                return (
                  <ListGroup.Item key={index} className="mb-3 rounded">
                    <div className="flex flex-row justify-around ">
                      <p className="w-[100px] ">{each.name}</p>
                      <p>
                        From:
                        <span className="ml-2">{`${fromTo.from}  (${dates.startDate})`}</span>
                      </p>
                      <p>
                        To:
                        <span className="ml-2">{`${fromTo.to}  ${dates.endDate}`}</span>
                      </p>
                      <p className="ml-2">Price: {each.price}</p>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </>
      ) : (
        <div className="single-card">
          <ListGroup>
            {flightNames.map((each, index) => {
              return (
                <ListGroup.Item className="flex flex-col mb-3" key={index}>
                  <div className="flex flex-row justify-around">
                    <p className="w-[100px] ">{each.name}</p>
                    <p>
                      From:<span>{`${fromTo.from}  ${dates.startDate}`}</span>
                    </p>
                    <p>
                      To:<span>{`${fromTo.to}  ${dates.endDate}`}</span>
                    </p>
                    <p>Price: {each.price}</p>
                  </div>
                  <div className="flex flex-row justify-around">
                    <p className="w-[100px] ">{each.name}</p>
                    <p>
                      From:<span>{`${fromTo.to}  (${dates.startDate})`}</span>
                    </p>
                    <p>
                      To:<span>{`${fromTo.from}  (${dates.startDate})`}</span>
                    </p>
                    <p>Price: {each.price}</p>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      )}
    </>
  );
};

export default SingleCard;
