export const getFragmentBody = (data: any, currentMerchant: any) => {
  return {
    raw_title: data.raw_title,
    raw_description: data.raw_description,
    terms: data.terms,
    title: data.title,
    description: data.description,
    applicable_on: data.applicable_on,
    user_type: data.user_type,
    discount: data.discount,
    not_applicable_on: data.not_applicable_on,
    min_purchase: data.min_purchase,
    max_discount: data.max_discount,
    payment_mode: data.payment_mode,
    exclusive: data.exclusive,
    merchant_id: data.merchant_id,
    merchant_name: currentMerchant?.name,
    brands: data.brands,
  };
};

export const searchHandler = (
  searchValue: any,
  setRowData: any,
  rowData: any,
  coupons: any
) => {
  if (searchValue) {
    setRowData(
      rowData.filter((item: any) => {
        return item.title?.toLowerCase()?.includes(searchValue?.toLowerCase());
      })
    );
  } else {
    setRowData(JSON.parse(JSON.stringify(coupons)));
  }
};

export const addFilter = (gridApi: any, setLoading: any) => {
  if (gridApi) {
    const filterInstance = gridApi.getFilterInstance("editor_status");
    if (filterInstance) {
      filterInstance.setModel({
        type: "equals",
        filter: "not_published", // Default filter value
      });
      gridApi.onFilterChanged();
      setLoading(false);
    }
  }
};


export const updateTableCell = async (params: any,rowData:any,updateCoupon:any) => {
    const { data, column, newValue } = params;
    const updatedData = rowData?.map((row: any) =>
      row.id === data.id ? { ...row, [column.getColId()]: newValue } : row
    );
    const updatedUser = updatedData?.find((user: any) => user.id === data.id);
    if (updatedUser) {
      await updateCoupon(data.id, updatedUser);
    }
  };

export const updateSelectedRows = (gridRef:any,setSelectedRows:any)=>{
    const nodesToUpdate = gridRef.current!.api.getSelectedNodes();
    const selectedIds = nodesToUpdate.map((node: any) => node.data.id);
    setSelectedRows(selectedIds);
  }