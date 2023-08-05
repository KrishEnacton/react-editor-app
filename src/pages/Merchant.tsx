import React, { useEffect, useState } from "react";
import FullScreenLoader from "../components/core/loaders/FullScreen";
import { useParams } from "react-router-dom";
import { useCoupons } from "../hooks/use-Coupons";
import Table from "../components/generic/table";
import { useInitials } from "../hooks/use-Initials";
import { useSetRecoilState } from "recoil";
import { arrayAtomFamily } from "../atoms";
import { useMerchants } from "../hooks/use-Merchants";

export default function Merchant() {
  const [merchantsData, setMerchantsData] = useState([]);
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

  const getMerchant = async () => {
    const data: any = await getMerchantInfo(merchantId);
    if (data) setCurrentMerchant(data);
    setLoader(false);
  };

  const getCoupons = async () => {
    const data: any = await getCouponData(merchantId);
    if (data) setMerchantsData(data.data);
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
    <div className="flex my-12 items-center justify-center">
      <Table
        rowData={merchantsData}
        setRowData={setMerchantsData}
        merchantId={merchantId}
      />
    </div>
  );
}
