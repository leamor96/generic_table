export interface TableItem {
  id: number;
  name: string;
  age: number;
  gender: string;
}

export interface TableColumn {
  key: keyof TableItem;
  label: string;
}

export interface GenericTableProps {
  data: TableItem[];
  headers: TableColumn[];
}
