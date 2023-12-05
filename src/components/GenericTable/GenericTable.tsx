import { useState, useEffect } from "react";
import { GenericTableProps, TableItem } from "../../@types";
import "./GenericTable.css"


const GenericTable:React.FC<GenericTableProps> = ({
  data: initialData,
  headers,
}) => {
  const [data, setData] = useState<TableItem[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof TableItem | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterApplied, setFilterApplied] = useState(false); // Track if filter button is clicked

  useEffect(() => {
    setData(initialData);
    setCurrentPage(1);
  }, [initialData]);

  const handleSort = (key: keyof TableItem) => {
    setSortKey(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

   const handleFilterButtonClick = () => {
     setFilterApplied(!filterApplied);
   };

  const filteredData = data
    .filter((item) =>
    filterApplied
      ? Object.entries(filters).every(([key, value]) => {
        const itemValue = String(item[key as keyof TableItem]).toLowerCase();
        const filterValue = value.toLowerCase();
        return itemValue.includes(filterValue);
      })
      :true
    )
    .sort((a, b) => {
      if (sortKey) {
        const valueA = Number(a[sortKey]);
        const valueB = Number(b[sortKey]);
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });

  const pageSize = 5;
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedData = filteredData.slice(startIdx, endIdx);

  return (
    <div>
         <button onClick={handleFilterButtonClick}>
        {filterApplied ? "Hide Filters" : "Filter"}
      </button>
      {filterApplied && (
        <>
      {/* Filter input for each column */}
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
          disabled={endIdx >= filteredData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GenericTable;
