import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const parseDate = (inputString: any) => {
  if (inputString) {
    // Check if the input string contains 'T' or '.'
    if (inputString.includes("T") || inputString.includes(".")) {
      return new Date(inputString);
    } else {
      // If no 'T' or '.' present, assume the input string is in "YYYY-MM-DD HH:mm:ss" format
      const [datePart, timePart] = inputString.split(" ");
      const [year, month, day] = datePart.split("-");
      const [hours, minutes, seconds] = timePart.split(":");
      return new Date(year, month - 1, day, hours, minutes, seconds);
    }
  } else {
    return new Date();
  }
};

const formatDate = (dateObj: any) => {
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const hours = String(dateObj.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const DateTimePicker = forwardRef((props: any, ref) => {
  const [selectedDateTime, setSelectedDateTime] = useState(parseDate(props.value));
  const handleDateTimeChange = (momentObj: any) => {
    setSelectedDateTime(momentObj.toDate());
  };

  /* Component Editor Lifecycle methods */
  useImperativeHandle(ref, () => ({
    getValue: () => formatDate(selectedDateTime),
  }));

  useEffect(() => {
    // When the component mounts, focus the DateTime component or open the calendar
    const dateInput: any = document?.querySelector(".form-control");
    if (dateInput) {
      dateInput.click();
    }
  }, []);

  return <Datetime value={selectedDateTime} onChange={handleDateTimeChange} className="w-52" />;
});

export default DateTimePicker;
