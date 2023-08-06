import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useEffect, useRef, useState } from "react";
import "ag-grid-enterprise";
import { useCoupons } from "../../../hooks/use-Coupons";
import { useRecoilValue } from "recoil";
import { arrayAtomFamily } from "../../../atoms";
import { columnDefs, defaultColDef, sideBar } from "./config";
import {
  addFilter,
  updateSelectedRows,
  updateTableCell,
} from "../../../helpers/table";
import TableHeader from "./TableHeader";

export default function Table({ rowData, setRowData }: any) {
  const gridRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const coupons = useRecoilValue(arrayAtomFamily("allCoupons"));
  const { updateCoupon } = useCoupons();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gridApi) {
      addFilter(gridApi, setLoading);
    }
  }, [gridApi]);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <TableHeader
        gridRef={gridRef}
        searchValue={searchValue}
        rowData={rowData}
        setRowData={setRowData}
        coupons={coupons}
        setSearchValue={setSearchValue}
        selectedRows={selectedRows}
      />
      <div
        className={"ag-theme-alpine " + `${loading ? "hidden" : "block"}`}
        style={{ width: "95vw", height: "86vh", fontSize: "17px" }}
      >
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColDef}
          rowData={rowData}
          columnDefs={columnDefs}
          onCellEditingStopped={(params) =>
            updateTableCell(params, rowData, updateCoupon)
          }
          rowHeight={75}
          pagination={true}
          paginationPageSize={10}
          tooltipShowDelay={0}
          animateRows={true}
          onRowSelected={() => updateSelectedRows(gridRef, setSelectedRows)}
          rowSelection={"multiple"}
          suppressRowClickSelection={true}
          tooltipHideDelay={2000}
          sideBar={sideBar}
          onGridReady={(params: any) => setGridApi(params.api)}
        />
      </div>
    </div>
  );
}
