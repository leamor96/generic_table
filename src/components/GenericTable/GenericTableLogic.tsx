// GenericTableLogic.tsx
import React, { useState, useEffect } from "react";
import { GenericTableProps, TableItem } from "../../@types";
import GenericTableHTML from "./GenericTableHtml";
import "./GenericTable.css";

const GenericTableLogic: React.FC<GenericTableProps> = ({
  data: initialData,
  headers,
}) => {
  const [data, setData] = useState<TableItem[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof TableItem | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterApplied, setFilterApplied] = useState(false);

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
            const itemValue = String(
              item[key as keyof TableItem]
            ).toLowerCase();
            const filterValue = value.toLowerCase();
            return itemValue.includes(filterValue);
          })
        : true
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
    <GenericTableHTML
      headers={headers}
      paginatedData={paginatedData}
      handleSort={handleSort}
      handlePageChange={handlePageChange}
      handleFilterChange={handleFilterChange}
      handleFilterButtonClick={handleFilterButtonClick}
      filterApplied={filterApplied}
      data={data} 
      sortKey={sortKey}
      sortOrder={sortOrder}
      currentPage={currentPage}
      endIdx={endIdx}
      filteredData={filteredData}
    />
  );
};

export default GenericTableLogic;
