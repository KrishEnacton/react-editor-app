import { api } from "../api/apiProvider";
import { config } from "../config";

export function useMerchants() {
  const getMerchantData = () => {
    return new Promise((resolve) => {
      api.get(config.local_url + config.merchants_endpoint).then((res: any) => {
        resolve(res);
      });
    });
  };
  const getMerchantInfo = (id: any) => {
    return new Promise((resolve) => {
      api.get(config.local_url + config.merchant_info_endpoint + "/" + id).then((res: any) => {
        resolve(res.data.merchant.name);
      });
    });
  };

  return {
    getMerchantData,
    getMerchantInfo,
  };
}
