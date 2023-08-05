import React, { forwardRef, useImperativeHandle, useState } from "react";
import { arrayAtomFamily } from "../../../../atoms";
import { useCoupons } from "../../../../hooks/use-Coupons";
import { getMatchingBrands, getRandomSubset } from "../../../../utils";

import PrimaryButton from "../../../core/PrimaryButton";
import { useRecoilValue } from "recoil";

const AttachBrand = forwardRef((props: any, ref) => {
  const brands = useRecoilValue(arrayAtomFamily("allBrands"));
  const { updateCoupon } = useCoupons();
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    getValue: () => "abc",
  }));

  return (
    <div className="example-header flex space-x-3">
      <PrimaryButton
        label={"Attach Brand"}
        loading={loading}
        onClick={async () => {
          setLoading(true);

          if (brands) {
            const matchingBrandIds = getMatchingBrands(
              props.data.categories,
              brands
            );
            const randomSubset = getRandomSubset(matchingBrandIds, 10);
            const body = { brands: randomSubset };
            const response = await updateCoupon(props.data.id, body);
          }
          setLoading(false);
        }}
      />
    </div>
  );
});

export default AttachBrand;
