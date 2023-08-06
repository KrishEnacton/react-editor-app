import { useRecoilValue, useSetRecoilState } from "recoil";
import { api } from "../api/apiProvider";
import { arrayAtomFamily } from "../atoms";
import { config } from "../config";
import { ErrorAlert, SuccessAlert } from "../utils/appToast";
import { modifyInputDatesInArray, modifyOutputDates } from "../utils";

export function useCoupons() {
  const setCoupons = useSetRecoilState(arrayAtomFamily("allCoupons"));
  const currentMerchant = useRecoilValue(arrayAtomFamily("currentMerchant"));

  const getCouponData = (id: any) => {
    return new Promise((resolve) => {
      api
        .get(config.local_url + config.coupons_endpoint + "/" + id)
        .then((res: any) => {
          const newDataData = JSON.parse(JSON.stringify(res.data));
          setCoupons(modifyInputDatesInArray(newDataData));
          resolve(res.data);
        });
    });
  };

  const updateCoupon = (id: any, data: any) => {
    const updatedBody = modifyOutputDates(data);
    return new Promise((resolve) => {
      api
        .post(
          config.local_url + config.coupons_update_endpoint + "/" + id,
          updatedBody
        )
        .then((res: any) => {
          if (res.success == 1) {
            getCouponData(currentMerchant.id);
            SuccessAlert("Coupon Updated Successfully");
          } else {
            ErrorAlert(res.message);
          }
          resolve(res);
        });
    });
  };

  const refragmentCoupon = (id: any, data: any) => {
    return new Promise((resolve) => {
      api
        .post(
          config.local_url + config.refragment_coupon_endpoint + "/" + id,
          data
        )
        .then((res: any) => {
          resolve(res);
        });
    });
  };
  return {
    getCouponData,
    updateCoupon,
    refragmentCoupon,
  };
}
