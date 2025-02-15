import React from "react";
import { useState } from "react";
import "../../css_files/Master/AddBoilerSeriesMaster.css";
import CloseForm from "./CloseForm";
import axios from "axios";

function AddBoilerSeriesMaster({ setshowaddform, reload, setReload }) {
  const [boilerSeriesData, setBoilerSeriesData] = useState({
    Head: "",
    SeriesCode: "",
    Description: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/BoilerSeries`;
    axios
      .post(URL, boilerSeriesData)
      .then((response) => {
        console.log(response.data);
        setshowaddform(false);
        setReload(!reload);
      })
      .catch((error) => {
        console.error("Error adding boiler series data:", error);
      });
  }
  return (
    <form className="add-boiler-series-master" onSubmit={handleSubmit}>
      <blockquote>
        <label>Boiler Head</label>
        <select
          onChange={(e) =>
            setBoilerSeriesData({
              ...boilerSeriesData,
              Head: e.target.value,
            })
          }
        >
          <option value="">Select Boiler Head</option>
          <option>Fire Tube Boiler</option>
          <option>Water Tube Boiler</option>
          <option>Electric Boiler</option>
        </select>
      </blockquote>
      <blockquote>
        <label>Series Code</label>
        <input
          type="text"
          placeholder="Enter Series Code"
          onChange={(e) =>
            setBoilerSeriesData({
              ...boilerSeriesData,
              SeriesCode: e.target.value,
            })
          }
        />
      </blockquote>
      <blockquote>
        <label>Description</label>
        <textarea
          rows={5}
          placeholder="Enter Description"
          onChange={(e) =>
            setBoilerSeriesData({
              ...boilerSeriesData,
              Description: e.target.value,
            })
          }
        ></textarea>
      </blockquote>
      <button type="submit">Add </button>
      <CloseForm close={setshowaddform} />
    </form>
  );
}

export default AddBoilerSeriesMaster;
