import React from "react";
import GenericTableLogic from "./GenericTableLogic";
import { GenericTableProps } from "../../@types";


const GenericTable: React.FC<GenericTableProps> = (props) => (
  
  <GenericTableLogic {...props} />
);

export default GenericTable;
