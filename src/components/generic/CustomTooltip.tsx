import React from "react";
import { ITooltipParams } from "ag-grid-community";
export default (props: ITooltipParams & { color: string }) => {
  return <div className="custom-tooltip rounded-md shadow-md bg-white max-w-xl text-base p-3">{props.value}</div>;
};


export const truncateCellRenderer: React.FC<any> = ({ value }) => (
  <div
    style={{
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    {value}
  </div>
);