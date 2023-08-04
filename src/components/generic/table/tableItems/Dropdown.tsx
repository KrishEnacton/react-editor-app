import React, { forwardRef, useImperativeHandle, useState } from "react";
import { config } from "../../../../config";
import SelectDropdown from "../../SelectDropdown";

const Dropdown = forwardRef((props: any, ref) => {
  const [selectedValue, setSelectedValue] = useState(props.value);

  const handleInputChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => selectedValue,
  }));

  return (
    <div className="example-header">
      <SelectDropdown onChange={handleInputChange} label={""} options={config.usersTypeOptions} id={"page-size"} />
    </div>
  );
});

export default Dropdown;
