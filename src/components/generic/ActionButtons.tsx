import React, { useState } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { config } from "../../config";
import PrimaryButton from "../core/PrimaryButton";
import { useCoupons } from "../../hooks/use-Coupons";

export default ({ data }: ICellRendererParams) => {
  const { updateCoupon } = useCoupons();
  const initialLoadingState = {};
  Object.keys(config.actionButtons).forEach((status) => {
    initialLoadingState[status] = false;
  });
  const [loading, setLoading] = useState(initialLoadingState);
  
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
                loading={loading[data.editor_status][button.toLowerCase()]} 
                onClick={async () => {
                  setLoading((prevState) => ({
                    ...prevState,
                    [data.editor_status]: {
                      ...prevState[data.editor_status],
                      [button.toLowerCase()]: true, // Set loading state for the specific button and editor_status
                    },
                  }));
                  // setLoading(true);
                  const editedButton = button?.toLowerCase();
                  //@ts-ignore
                  const body =
                    config.actionButtonsBody[data.editor_status][editedButton][
                      "body"
                    ];
                  await updateCoupon(data.id, body);
                  // setLoading(false);
                  setLoading((prevState) => ({
                    ...prevState,
                    [data.editor_status]: {
                      ...prevState[data.editor_status],
                      [button.toLowerCase()]: false, // Set loading state for the specific button and editor_status
                    },
                  }));

                }}
                customClass={`${
                  config.actionButtonsBody[data.editor_status][
                    button?.toLowerCase()
                  ]["className"]
                }`}
              />
            );
          }
        )}
    </div>
  );
};
