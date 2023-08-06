// useCouponsShared.ts
import { useEffect, useState } from "react";
import { api } from "../api/apiProvider";
import { config } from "../config";
import { useRecoilState} from "recoil";
import { arrayAtomFamily } from "../atoms";
import { convertFragmentDataIntoOptions } from "../utils";

export function useInitials() {
  const [fragments, setFragments] = useRecoilState(
    arrayAtomFamily("allFragmentData")
  );
  const [brands, setBrands] = useRecoilState(arrayAtomFamily("allBrands"));

  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Call the functions and set loading to false when both are done
    Promise.all([getAllFragments(), getAllBrands()]).then(() => {
      setLoading(false);
    });
  }, []);

  const getAllFragments = () => {
    return new Promise((resolve) => {
      api.get(config.local_url + config.fragments_endpoint).then((res: any) => {
        const convertedData: any = convertFragmentDataIntoOptions(res.data);
        setFragments(convertedData);
        resolve(res.data);
      });
    });
  };

  const getAllBrands = () => {
    return new Promise((resolve) => {
      api.get(config.local_url + config.brands_endpoint).then((res: any) => {
        setBrands(res.data);
        resolve(res.data);
      });
    });
  };

  return {
    getAllFragments,
    fragments,
    brands,
    loading, // Add loading to the returned values
  };
}
