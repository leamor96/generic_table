import React from "react";
import "./App.css";
import GenericTable from "./components/GenericTable/GenericTable";
import { TableItem, TableColumn } from "./@types";

const App: React.FC = () => {
  const headers: TableColumn[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
  ];

  // You can import the data from the JSON file dynamically in a real-world scenario
  // For simplicity, import it directly here
  const data: TableItem[] = require("././data/data.json").data;

  return (
    <div className="App">
      <h1>Generic Table Assignment</h1>
      <GenericTable data={data} headers={headers} />
    </div>
  );
};

export default App;
