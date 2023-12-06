import { GenericTableProps, TableItem } from "../../@types";

export interface GenericTableHTMLProps extends GenericTableProps {
  paginatedData: TableItem[];
  handleSort: (key: keyof TableItem) => void;
  handlePageChange: (page: number) => void;
  handleFilterChange: (key: string, value: string) => void;
  handleFilterButtonClick: () => void;
  filterApplied: boolean;
  sortKey: keyof TableItem | null;
  sortOrder: "asc" | "desc";
  currentPage: number;
  endIdx: number;
  filteredData: TableItem[];
}
