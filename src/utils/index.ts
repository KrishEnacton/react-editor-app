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
  const matchingBrandIds = [];

  for (const brand of brandsArray) {
    const brandCats = JSON.parse(brand.cats);
    if (brandCats) {
      const hasMatchingCat = brandCats.some((cat: any) => catsArray.includes(cat));

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
