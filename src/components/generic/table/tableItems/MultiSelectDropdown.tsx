import React from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
import Select, { MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

export default forwardRef((props: any, ref) => {
  const { columnId } = props;
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    Array.isArray(props.value)
      ? props.value.map((item: any) => ({ value: String(item), label: String(item) }))
      : [
          {
            value: props.value,
            label: props.value,
          },
        ]
  );
  function removeDuplicates(arr: Option[]): Option[] {
    const uniqueValues = new Set<string>();
    return arr?.filter((item) => {
      const key = `${item.value}:${item.label}`?.toLowerCase();
      if (!uniqueValues.has(key)) {
        uniqueValues.add(key);
        return true;
      }
      return false;
    });
  }

  useImperativeHandle(ref, () => ({
    getValue: () => selectedOptions.map((item) => item.label).join(", "),
  }));

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(removeDuplicates(selected as Option[]));
  };

  const categoryOptions: Option[] = [
    { value: "1001", label: "1001" },
    { value: "1100", label: "1100" },
    { value: "1110", label: "1110" },
    { value: "1000", label: "1000" },
    { value: "1010", label: "1010" },
    { value: "1007", label: "1007" },
    { value: "1008", label: "1008" },
    { value: "1002", label: "1002" },
    { value: "1004", label: "1004" },
    { value: "1005", label: "1005" },
    { value: "1002", label: "1002" },
    { value: "1003", label: "1003" },
    { value: "1004", label: "1004" },
  ];

  const brandsOptions: Option[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "strawberry", label: "Strawberry" },
  ];

  const tagsOptions: Option[] = [
    { value: "11003", label: "11003" },
    { value: "11000", label: "11000" },
    { value: "11000", label: "11000" },
    { value: "11006", label: "11006" },
    { value: "12000", label: "12000" },
    { value: "12001", label: "12001" },
    { value: "10000", label: "10000" },
    { value: "15001", label: "15001" },
    { value: "15002", label: "15002" },
    { value: "15003", label: "15003" },
    { value: "15004", label: "15004" },
    { value: "15009", label: "15009" },
    { value: "15000", label: "15000" },
    { value: "11006", label: "11006" },
  ];

  const options =
    columnId === "categories"
      ? categoryOptions
      : columnId === "tags"
      ? tagsOptions
      : columnId === "brands"
      ? brandsOptions
      : [];
  return (
    <div className="mood" tabIndex={1}>
      <Select isMulti options={options} value={selectedOptions} closeMenuOnSelect={false} onChange={handleChange} />
    </div>
  );
});
