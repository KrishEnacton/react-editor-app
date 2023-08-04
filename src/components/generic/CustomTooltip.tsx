import React from "react";
import { ITooltipParams } from "ag-grid-community";
export default (props: ITooltipParams & { color: string }) => {
  return <div className="custom-tooltip rounded-md shadow-md bg-white max-w-xl text-base p-3">{props.value}</div>;
};
