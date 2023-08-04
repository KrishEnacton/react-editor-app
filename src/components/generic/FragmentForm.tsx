import React, { useEffect } from "react";
import { useState } from "react";
import { useCoupons } from "../../hooks/use-Coupons";
import FullScreenLoader from "../core/loaders/FullScreen";
import SpinnerLoader from "../core/loaders/SpinnerLoader";

export default function FragmentForm({ data, selectedId, merchant, onClose }: any) {
  const [formData, setFormData] = useState(data);
  const { refragmentCoupon, updateCoupon } = useCoupons();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refragmentCouponHandler();
    return () => {};
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const refragmentCouponHandler = async () => {
    const {
      raw_title,
      raw_description,
      terms,
      title,
      description,
      applicable_on,
      user_type,
      discount,
      not_applicable_on,
      min_purchase,
      max_discount,
      brands,
      payment_mode,
      merchant_id,
      exclusive,
    } = data;
    const fragmentBody = {
      raw_title,
      raw_description,
      terms,
      title,
      description,
      applicable_on,
      user_type,
      discount,
      not_applicable_on,
      min_purchase,
      max_discount,
      payment_mode,
      exclusive,
      merchant_id,
      merchant_name: merchant,
      brands,
    };
    const response: any = await refragmentCoupon(selectedId, fragmentBody);
    setFormData(response.data);
    setLoading(false);
  };

  if (loading)
    return (
      <div className="h-[700px] p-3 flex items-center justify-center">
        <SpinnerLoader className={"!h-52 !w-h-52"} customClass={"!h-52 !w-h-52"} />
      </div>
    );
  return (
    <form
      onSubmit={async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const newObject = { ...formData };
        delete newObject.status;
        const res = await updateCoupon(data.id, newObject);
        onClose();
      }}
    >
      <div className="space-y-12 max-h-[700px] p-3 overflow-y-auto">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Coupon Data</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="sm:col-span-6">
                <label htmlFor={key} className="block text-sm font-medium leading-6 text-gray-900">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " ")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name={key}
                    id={key}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={value as string}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={onClose} type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Accept
        </button>
      </div>
    </form>
  );
}
