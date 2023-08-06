/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { config } from "../../config";
import PrimaryButton from "../core/PrimaryButton";
import { useCoupons } from "../../hooks/use-Coupons";

export default ({ data }: ICellRendererParams) => {
  const { getCouponData, updateCoupon } = useCoupons();
  const [loading, setLoading] = useState(false);

  return (
    <div className="custom-element flex  space-x-3">
      {data &&
        data.editor_status &&
        //@ts-ignore
        config.actionButtons[`${data.editor_status}`].map(
          (button: any, index: any) => {
            return (
              <PrimaryButton
                label={button}
                key={button}
                loading={loading}
                onClick={async () => {
                  setLoading(true);
                  const editedButton = button?.toLowerCase();
                  //@ts-ignore
                  const body = config.actionButtonsBody[data.editor_status][editedButton]["body"];
                  await updateCoupon(data.id, body);                  
                  setLoading(false);                  
                }}
                customClass={`${config.actionButtonsBody[data.editor_status][button?.toLowerCase()]["className"]}`}
              />
            );
          }
        )}
    </div>
  );
};
