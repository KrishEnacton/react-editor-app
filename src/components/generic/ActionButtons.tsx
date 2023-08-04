import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import { config } from "../../config";
import PrimaryButton from "../core/PrimaryButton";
import { useCoupons } from "../../hooks/use-Coupons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { arrayAtomFamily } from "../../atoms";
import { useParams } from "react-router-dom";

export default ({ data }: ICellRendererParams) => {
  const { getCouponData, updateCoupon } = useCoupons();
  const setCoupons = useSetRecoilState(arrayAtomFamily("allCoupons"));

  const { merchantId } = useParams();

  const getCoupons = async () => {
    const data: any = await getCouponData(merchantId);
    if (data) setCoupons(data.data);
  };
  return (
    <div className="custom-element flex  space-x-3">
      {data &&
        data.editor_status &&
        //@ts-ignore
        config.actionButtons[`${data.editor_status}`].map((button: any, index: any) => {
          return (
            <PrimaryButton
              label={button}
              key={button}
              onClick={async () => {
                const editedButton = button?.toLowerCase();
                //@ts-ignore
                const body = config.actionButtonsBody[data.editor_status][editedButton];
                const response = await updateCoupon(data.id, body);
                await getCoupons();
              }}
            />
          );
        })}
    </div>
  );
};
