//Unused due to technical failures
import { TableItem } from "../@types";

const fetchData = async (): Promise<TableItem[]> => {
  // Simulate fetching data from an API or other source
  const response = await fetch("/data/data.json");
  const { data } = await response.json();
  return data;
};

export default fetchData;
