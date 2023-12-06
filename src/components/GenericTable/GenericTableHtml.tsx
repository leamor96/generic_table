import React from "react";
import { GenericTableHTMLProps } from "./GenericTableTypes";

const GenericTableHTML: React.FC<GenericTableHTMLProps> = ({
  headers,
  paginatedData,
  handleSort,
  handlePageChange,
  handleFilterChange,
  handleFilterButtonClick,
  filterApplied,
  sortKey,
  sortOrder,
  currentPage,
  endIdx,
  filteredData,
}) => (
  <div>
    <button onClick={handleFilterButtonClick}>
      {filterApplied ? "Hide Filters" : "Filter"}
    </button>
    {filterApplied && (
      <>
        {headers.map((header) => (
          <div key={header.key}>
            <label>{header.label}</label>
            <input
              type="text"
              placeholder={`Enter ${header.label}`}
              onChange={(e) =>
                handleFilterChange(header.key as string, e.target.value)
              }
            />
          </div>
        ))}
      </>
    )}
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key} onClick={() => handleSort(header.key)}>
              {header.label}{" "}
              {sortKey === header.key && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((item, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header.key}>{item[header.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div>
      <span>Page {currentPage}</span>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={endIdx >= filteredData.length || paginatedData.length === 0}
      >
        Next
      </button>
    </div>
  </div>
);

export default GenericTableHTML;
