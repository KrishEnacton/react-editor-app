export const convertFragmentDataIntoOptions = (inputObj: any) => {
  const result = [];
  for (const key in inputObj) {
    if (inputObj.hasOwnProperty(key)) {
      const value = inputObj[key];
      const obj = { value: key, label: value };
      result.push(obj);
    }
  }
  return result;
};

export function getMatchingBrands(catsArray: any, brandsArray: any) {
  if (!Array.isArray(catsArray)) {
    catsArray = [catsArray]; // Convert to an array with a single element
  }
  const matchingBrandIds = [];

  for (const brand of brandsArray) {
    const brandCats = JSON.parse(brand.cats);
    if (brandCats) {
      const hasMatchingCat = brandCats.some((cat: any) =>
        catsArray.includes(cat)
      );

      if (hasMatchingCat) {
        matchingBrandIds.push(brand.id);
      }
    }
  }
  return matchingBrandIds;
}
export function getRandomSubset(arr: any, maxSize: any) {
  const shuffled = arr.slice(); // Clone the array to avoid modifying the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(maxSize, shuffled.length));
}

export const formatDate = (dateObj: any) => {
  if (dateObj) {
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const hours = String(dateObj.getUTCHours()).padStart(2, "0");
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return null;
};

export function formatDateToUTC(inputDate: any) {
  const dateParts = inputDate.split(" ");
  const datePart = dateParts[0];
  const timePart = dateParts[1];

  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  const date = new Date(
    Date.UTC(year, month - 1, day, hours, minutes, seconds)
  );

  return date.toISOString();
}

export function dateConverter(inputDate: any) {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDateToUTC2(inputDate: any) {
  if (inputDate) {
    const dateParts = inputDate?.split(" ");
    const datePart = dateParts[0];
    const timePart = dateParts[1];

    const [year, month, day] = datePart?.split("-").map(Number);
    const [hours, minutes, seconds] = timePart?.split(":").map(Number);

    const date = new Date(
      Date.UTC(year, month - 1, day, hours, minutes, seconds)
    );

    // Format the milliseconds to 6 digits
    const milliseconds = String(date.getMilliseconds()).padStart(6, "0");

    return `${date.toISOString().slice(0, -1)}.${milliseconds}Z`;
  }
  return null;
}

export function modifyInputDatesInArray(dataArray: any) {
  const modifiedArray = dataArray.map((obj: any) => {
    const modifiedObj = { ...obj };
    modifiedObj.created_at = dateConverter(obj.created_at);
    modifiedObj.updated_at = dateConverter(obj.updated_at);
    modifiedObj.tags = obj.tags ? obj.tags.join(",") : null;
    modifiedObj.brands = obj.brands ? obj.brands.join(",") : null;
    modifiedObj.categories = obj.categories
      ? Array.isArray(obj.categories)
        ? obj.categories.join(",")
        : `${obj.categories}`
      : null;
    return modifiedObj;
  });

  return modifiedArray;
}

export function modifyOutputDates(data: any) {
  const modifyDates = (obj: any) => {
    if (!obj.created_at && !obj.updated_at) {
      return obj;
    }
    const modifiedObj = { ...obj };
    if (modifiedObj.created_at)
      modifiedObj.created_at = formatDateToUTC2(obj.created_at);
    if (modifiedObj.updated_at)
      modifiedObj.updated_at = formatDateToUTC2(obj.updated_at);
    if (modifiedObj.tags)
      modifiedObj.tags = obj.tags
        ? obj.tags.split(",").map((id: any) => Number(id.trim()))
        : null;
    if (modifiedObj.brands)
      modifiedObj.brands = obj.brands
        ? obj.brands.split(",").map((id: any) => Number(id.trim()))
        : null;
    if (modifiedObj.categories)
      modifiedObj.categories = obj.categories
        ? obj.categories.split(",").map((id: any) => Number(id.trim()))
        : null;
    return modifiedObj;
  };

  if (Array.isArray(data)) {
    return data.map(modifyDates);
  } else {
    return modifyDates(data);
  }
}
