import React, { useEffect, useState } from "react";
import FullScreenLoader from "../components/core/loaders/FullScreen";
import { useParams } from "react-router-dom";
import { useCoupons } from "../hooks/use-Coupons";
import Table from "../components/generic/table";
import { useInitials } from "../hooks/use-Initials";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { arrayAtomFamily } from "../atoms";
import { useMerchants } from "../hooks/use-Merchants";

export default function Merchant() {
  const [merchantsData, setMerchantsData] = useState([]);
  const coupons = useRecoilValue(arrayAtomFamily("allCoupons"));
  const [loader, setLoader] = useState(true);
  const { merchantId } = useParams();
  const { getCouponData } = useCoupons();
  const { getMerchantInfo } = useMerchants();
  const { loading } = useInitials();
  const setCurrentMerchant = useSetRecoilState(
    arrayAtomFamily("currentMerchant")
  );

  useEffect(() => {
    if (loading) {
      getCoupons();
    }
    return () => {};
  }, []);

  useEffect(() => {
    merchantId && getMerchant();
    return () => {};
  }, [merchantId]);

  // useEffect(() => {
  //   coupons &&
  //     coupons.length > 0 &&
  //     setMerchantsData(JSON.parse(JSON.stringify(coupons)));
  //   return () => {};
  // }, [coupons]);

  const getMerchant = async () => {
    const data: any = await getMerchantInfo(merchantId);
    if (data) setCurrentMerchant(data);
  };

  const getCoupons = async () => {
    const couponsData = await getCouponData(merchantId);
    // const tempData = couponsData.filter(
    //   (coupon: any) => coupon.editor_status === "not_published"
    // );
    // setTimeout(() => {
    //   setMerchantsData(JSON.parse(JSON.stringify(couponsData)));
    // }, 5000);
    if (couponsData) setMerchantsData(JSON.parse(JSON.stringify(couponsData)));
    setLoader(false);
  };

  if (loader)
    return (
      <FullScreenLoader
        className={
          "flex h-screen w-screen justify-center items-center text-red-300"
        }
      />
    );

  return (
    <div className="flex my-6 items-center justify-center">
      <Table rowData={merchantsData} setRowData={setMerchantsData} />
    </div>
  );
}
