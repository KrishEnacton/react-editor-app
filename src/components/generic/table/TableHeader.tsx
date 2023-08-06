import React, { useEffect } from "react";
import SelectDropdown from "../SelectDropdown";
import { config } from "../../../config";
import { searchHandler } from "../../../helpers/table";
import PrimaryButton from "../../core/PrimaryButton";

export default function TableHeader({
  gridRef,
  searchValue,
  rowData,
  setRowData,
  coupons,
  setSearchValue,
  selectedRows,
}: any) {
    
  useEffect(() => {
    searchHandler(searchValue, setRowData, rowData, coupons);
  }, [searchValue]);

  const handleGlobalSearch = (event: any) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="flex w-[95vw] items-center justify-start mb-4 flex-col sm:flex-row space-x-12 space-y-4 sm:space-y-0">
      <SelectDropdown
        label=""
        options={config.limitOptions}
        onChange={(e: any) => {
          gridRef.current!.api.paginationSetPageSize(Number(e.target.value));
        }}
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
  );
}
