import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Locations.css";

export const Locations = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const localKandyUser = localStorage.getItem("kandy_user");
  const kandyUserObject = JSON.parse(localKandyUser);

  useEffect(
    () => {
      // console.log("Initial state of tickets", tickets); // View the initial state of tickets
      const fetchData = async () => {
        const response = await fetch(`http://localhost:8088/locations`);
        const locationArray = await response.json();
        setLocations(locationArray);
      };
      fetchData();
    },
    [] // When this array is empty, you are observing initial component state
  );

  return (
    <>
      <h2>Store Locations</h2>
      <article className="locations">
        <table>
          <thead>
            <tr className="tableheader">
              <th>Address</th>
              <th>SqFt</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => {
              return (
                <tr key={location.id}>
                  <td>{location.address}</td>
                  <td className="number">{location.sqft.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
    </>
  );
};
