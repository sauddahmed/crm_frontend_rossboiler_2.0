import React, { useState, useEffect } from "react";
import "../../css_files/Master/PartsMaster.css";
import Table from "../Homepage/Table";
import AddPartsMaster from "./AddPartsMaster";
import SearchPartsMaster from "./SearchPartsMaster";
import axios from "axios";

function PartsMaster() {
  const [showaddform, setshowaddform] = useState(false);
  const [showsearchform, setshowsearchform] = useState(false);
  const tablehead = [
    "Part Id",
    "Part No.",
    "Part Name",
    "Part Description",
    "Category",
    "Subcategory",
    "Units",
    "GST (Percentage)",
    "HSN Code",
    "Types of Supply",
    "Selling Price",
    "Weight",
    "Dimensions",
    "Packing",
    "Material",
    "Certification",
  ];
  const [tabledata, setTableData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/api/v1/Parts`;
    axios
      .get(URL)
      .then((response) => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          const data = [];
          data.push(response.data[i].id);
          data.push(response.data[i].partNumber);
          data.push(response.data[i].name);
          data.push(response.data[i].description);
          data.push(response.data[i].category);
          data.push(response.data[i].subcategory);
          data.push(response.data[i].unitId);
          data.push(response.data[i].gstId);
          data.push(response.data[i].hsnDetailsId);
          data.push(response.data[i].supplyType);
          data.push(response.data[i].sellingPrice);
          data.push(response.data[i].weight);
          data.push(response.data[i].dimensions);
          data.push(response.data[i].packingId);
          data.push(response.data[i].materialOfConstruction);
          data.push(response.data[i].certification);
          setTableData((prev) => {
            const arr = [...prev];
            arr.push(data);
            return arr;
          });
        }
      })
      .catch((error) => {
        console.error("There was an error fetching parts data!", error);
      });
  }, []);

  return (
    <>
      <section className="parts-master">
        <h1>Parts Master</h1>
        <blockquote className="parts-master-forms">
          <button onClick={() => setshowaddform(true)}>Add Parts Master</button>
          <button onClick={() => setshowsearchform(true)}>
            Search Parts Master
          </button>
        </blockquote>
        {showaddform && (
          <AddPartsMaster
            setshowaddform={setshowaddform}
            reload={reload}
            setReload={setReload}
          />
        )}
        {showsearchform && (
          <SearchPartsMaster setshowsearchform={setshowsearchform} />
        )}
        <Table tablehead={tablehead} tabledata={tabledata} />
      </section>
    </>
  );
}

export default PartsMaster;
