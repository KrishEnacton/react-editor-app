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
import PrimaryButton from "../../core/PrimaryButton";

export default function Table({ rowData, setRowData }: any) {
  const gridRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const coupons = useRecoilValue(arrayAtomFamily("allCoupons"));
  const { updateCoupon } = useCoupons();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchHandler(searchValue);
  }, [searchValue]);

  const truncateCellRenderer: React.FC<any> = ({ value }) => (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {loading ? null : value}
    </div>
  );

  const searchHandler = (searchValue: any) => {
    if (searchValue) {
      setRowData(
        rowData.filter((item: any) => {
          return item.title
            ?.toLowerCase()
            ?.includes(searchValue?.toLowerCase());
        })
      );
    } else {
      setRowData(JSON.parse(JSON.stringify(coupons)));
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
        setLoading(false);
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
    // const newDataData = JSON.parse(JSON.stringify(coupons));
    const updatedData = rowData.map((row: any) =>
      row.id === data.id ? { ...row, [column.getColId()]: newValue } : row
    );

    const updatedUser = updatedData.find((user: any) => user.id === data.id);
    if (updatedUser) {
      await updateCoupon(data.id, updatedUser);
    }
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
    const selectedIds = nodesToUpdate.map((node: any) => node.data.id);
    setSelectedRows(selectedIds);
  }, [gridRef]);

  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          minWidth: 225,
          width: 225,
          maxWidth: 225,
        },
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
          minWidth: 180,
          maxWidth: 400,
          width: 250,
        },
      ],
      position: "right",
      defaultToolPanel: "",
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="flex w-[95vw] items-center justify-start mb-4 flex-col sm:flex-row space-x-12 space-y-4 sm:space-y-0">
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

        {selectedRows.length > 0 && (
          <PrimaryButton
            label={"Update Selected Rows"}
            onClick={() => {
              alert(`You selected ${selectedRows}`);
            }}
            customClass={"!h-[36px]"}
          />
        )}
      </div>
      <div
        className={"ag-theme-alpine " + `${loading ? "hidden" : "block"}`}
        style={{ width: "95vw", height: "86vh", fontSize: "17px" }}
      >
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColDef}
          rowData={rowData}
          columnDefs={columnDefs}
          onCellEditingStopped={onCellEditingStopped}
          rowHeight={75}
          pagination={true}
          paginationPageSize={10}
          tooltipShowDelay={0}
          animateRows={true}
          onRowSelected={updateSelectedRows}
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
