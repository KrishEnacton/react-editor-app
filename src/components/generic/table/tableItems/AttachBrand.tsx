import React, { forwardRef, useImperativeHandle } from "react";
import { useRecoilValue } from "recoil";
import { arrayAtomFamily } from "../../../../atoms";
import { useCoupons } from "../../../../hooks/use-Coupons";
import { getMatchingBrands, getRandomSubset } from "../../../../utils";

import PrimaryButton from "../../../core/PrimaryButton";

const AttachBrand = forwardRef((props: any, ref) => {
  const brands = useRecoilValue(arrayAtomFamily("allBrands"));
  const { updateCoupon } = useCoupons();

  useImperativeHandle(ref, () => ({
    getValue: () => "abc",
  }));

  return (
    <div className="example-header flex space-x-3">
      <PrimaryButton
        label={"Attach Brand"}
        onClick={async () => {
          if (brands) {
            const matchingBrandIds = getMatchingBrands(props.data.categories, brands);
            const randomSubset = getRandomSubset(matchingBrandIds, 10);
            const body = { brands: randomSubset };
            const response = await updateCoupon(props.data.id, body);
          }
        }}
      />
    </div>
  );
});

export default AttachBrand;
