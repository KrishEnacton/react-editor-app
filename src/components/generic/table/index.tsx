/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ColDef } from "ag-grid-community";
import "ag-grid-enterprise";
import { useCoupons } from "../../../hooks/use-Coupons";
import CustomTooltip from "../CustomTooltip";
import { columnDefs } from "./config";
import SelectDropdown from "../SelectDropdown";
import { config } from "../../../config";
import { useRecoilValue } from "recoil";
import { arrayAtomFamily } from "../../../atoms";

const truncateCellRenderer: React.FC<any> = ({ value }) => (
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

export default function Table({ rowData, setRowData, merchantId }: any) {
  const gridRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  // State to store the grid API reference
  const [gridApi, setGridApi] = useState(null);
  const { updateCoupon } = useCoupons();
  const coupons = useRecoilValue(arrayAtomFamily("allCoupons"));
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    coupons &&
      coupons.length > 0 &&
      setTableData(JSON.parse(JSON.stringify(coupons)));
    return () => {};
  }, [coupons]);

  useEffect(() => {
    searchHandler(searchValue);
  }, [searchValue]);

  const searchHandler = (searchValue: any) => {
    if (searchValue) {
      setTableData(
        tableData.filter((item: any) => {
          return item.title
            ?.toLowerCase()
            ?.includes(searchValue?.toLowerCase());
        })
      );
    } else {
      setTableData(JSON.parse(JSON.stringify(coupons)));
    }
  };

  const handleGlobalSearch = useCallback((event: any) => {
    setSearchValue(event.target.value);
  }, []);

  useEffect(() => {
    if (gridApi) {
      //@ts-ignore
      const filterInstance = gridApi.getFilterInstance("editor_status");
      if (filterInstance) {
        filterInstance.setModel({
          type: "equals",
          filter: "not_published", // Default filter value
        });
        //@ts-ignore
        gridApi.onFilterChanged();
      }
    }
  }, [gridApi]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      minWidth: 100,
      filter: true,
      resizable: true,
      tooltipComponent: CustomTooltip,
      cellRenderer: truncateCellRenderer,
    };
  }, []);

  const onCellEditingStopped = async (params: any) => {
    const { data, column, newValue } = params;
    const newDataData = JSON.parse(JSON.stringify(rowData));
    const updatedData = newDataData.map((row: any) =>
      row.id === data.id ? { ...row, [column.getColId()]: newValue } : row
    );

    const updatedUser = updatedData.find((user: any) => user.id === data.id);
    if (updatedUser) {
      const response: any = await updateCoupon(data.id, updatedUser);
    }
  };

  const ImageCellRenderer: React.FC<{ value: string }> = ({ value }) => {
    return <img src={value} alt="Profile" width="35" height="35" />;
  };

  const onPageSizeChanged = useCallback(() => {
    var value = (document.getElementById("page-size") as HTMLInputElement)
      .value;
    //@ts-ignore
    gridRef.current!.api.paginationSetPageSize(Number(value));
  }, []);

  const updateSelectedRows = useCallback(() => {
    //@ts-ignore
    const nodesToUpdate = gridRef.current!.api.getSelectedNodes();
    if (nodesToUpdate.length > 0) {
      setSelectedRows(nodesToUpdate);
      const selectedIds = nodesToUpdate
        .map((node: any) => node.data.id)
        .join(",");

      alert(`You selected ${selectedIds}`);
    }
  }, [gridRef]);

  return (
    <div>
      <div className="flex items-center justify-start mb-4 flex-col sm:flex-row space-x-12 space-y-4 sm:space-y-0">
        <SelectDropdown
          label=""
          options={config.limitOptions}
          onChange={onPageSizeChanged}
          id="page-size"
        />
        <div>
          <input
            type="text"
            placeholder="Search by discount..."
            value={searchValue}
            onChange={handleGlobalSearch}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div style={{ marginBottom: "5px" }}>
          <button onClick={updateSelectedRows}>Update Selected Rows</button>
        </div>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ width: "98vw", height: "84vh", fontSize: "17px" }}
      >
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColDef}
          rowData={tableData}
          columnDefs={columnDefs}
          onCellEditingStopped={onCellEditingStopped}
          rowHeight={75}
          pagination={true}
          paginationPageSize={10}
          tooltipShowDelay={0}
          animateRows={true}
          sideBar={true}
          rowSelection={"multiple"}
          suppressRowClickSelection={true}
          tooltipHideDelay={2000}
          // onGridReady={(params: any) => setGridApi(params.api)}
          components={{ imageCellRenderer: ImageCellRenderer }}
        />
      </div>
    </div>
  );
}
