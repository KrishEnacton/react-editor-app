import Dropdown from "./tableItems/Dropdown";
import DateTimePicker from "./tableItems/DateTimePicker";
import MultiSelectDropdown from "./tableItems/MultiSelectDropdown";
import ActionButtons from "../ActionButtons";
import RefragmentCoupon from "./tableItems/RefragmentCoupon";
import AttachBrand from "./tableItems/AttachBrand";

const MultiSelectEditor = (params: any, columnId: string) => {
  if (params.data) {
    return {
      component: MultiSelectDropdown,
      popup: true,
      popupPosition: "under",
      params: { columnId }, // Pass the columnId to the MultiSelect component
    };
  }
  return undefined;
};

const dateTimeEditorSelector = (params: any, columnId: string) => {
  if (params.data) {
    return {
      component: DateTimePicker,
      popup: true,
      popupPosition: "under",
      params: { columnId }, // Pass the columnId to the MultiSelect component
    };
  }
  return undefined;
};

const dropdownSelector = (params: any) => {
  if (params.data) {
    return {
      component: Dropdown,
      popup: true,
      popupPosition: "under",
    };
  }
  return undefined;
};

export const columnDefs: any = [
  {
    headerName: "ID",
    field: "id",
    sortable: true,
    filter: true,
    width: 140,
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },
  {
    headerName: "Action",
    field: "action",
    sortable: false,
    filter: false,
    cellRenderer: ActionButtons,
    editable: false,
  },
  {
    headerName: "ReFragment Coupon",
    field: "refragment_coupon",
    sortable: false,
    filter: false,
    editable: true,
    cellRenderer: RefragmentCoupon,
    width: 260,
    // cellEditorSelector: (params: any) => attachBrandEditorSelector(params, "checked_at"),
  },
  {
    headerName: "Attach Brand",
    field: "attach_brand",
    sortable: false,
    filter: false,
    editable: true,
    cellRenderer: AttachBrand,
    width: 160,
    // cellEditorSelector: (params: any) => attachBrandEditorSelector(params, "checked_at"),
  },
  {
    headerName: "Coupon Code",
    field: "coupon_code",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Checked At",
    field: "checked_at",
    editable: true,
    sortable: true,
    width: 220,
    filter: true,
    cellEditorSelector: (params: any) => dateTimeEditorSelector(params, "checked_at"),
  },
  {
    headerName: "Created At",
    field: "created_at",
    editable: true,
    sortable: true,
    width: 220,
    filter: true,
    cellEditorSelector: (params: any) => dateTimeEditorSelector(params, "created_at"),
  },
  {
    headerName: "Deleted At",
    field: "deleted_at",
    editable: true,
    sortable: true,
    width: 220,
    filter: true,
    cellEditorSelector: (params: any) => dateTimeEditorSelector(params, "deleted_at"),
  },
  {
    headerName: "Discount",
    field: "discount",
    sortable: true,
    filter: true,
    editable: true,
    cellClass: (params: any) => {
      return params.value == "Up To 50% Off" ? "bg-red-300" : "bg-transparent";
    },
  },
  {
    headerName: "Applicable On",
    field: "applicable_on",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Applicable on Description",
    field: "applicable_on_desc",
    sortable: true,
    filter: true,
    editable: true,
    filterParams: {
      showTooltips: true,
    },
    width: 320,
    tooltipField: "applicable_on_desc",
  },
  {
    headerName: "Not Applicable On",
    field: "not_applicable_on",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "User Type",
    field: "user_type",
    sortable: true,
    filter: true,
    editable: true,
    width: 140,
    cellEditorSelector: dropdownSelector,
  },
  {
    headerName: "Min Purchase Amt",
    field: "min_purchase",
    sortable: true,
    filter: true,
    width: 200,
    editable: true,
  },
  {
    headerName: "Max Discount",
    field: "max_discount",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Terms",
    field: "terms",
    sortable: true,
    filter: true,
    editable: true,
    cellEditor: "agLargeTextCellEditor",
    cellEditorPopup: true,
    minWidth: 310,
  },
  {
    headerName: "Categories",
    field: "categories",
    sortable: true,
    filter: true,
    editable: true,
    width: 300,
    cellEditorSelector: (params: any) => MultiSelectEditor(params, "categories"),
  },
  {
    headerName: "Tags",
    field: "tags",
    sortable: true,
    filter: true,
    editable: true,
    width: 300,
    cellEditorSelector: (params: any) => MultiSelectEditor(params, "tags"),
  },
  {
    headerName: "Brands",
    field: "brands",
    sortable: true,
    filter: true,
    editable: true,
    width: 300,
    cellEditorSelector: (params: any) => MultiSelectEditor(params, "brands"),
  },
  {
    headerName: "Plain Link",
    field: "plain_link",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Affiliate Link",
    field: "affiliate_link",
    sortable: true,
    filter: true,
    editable: true,
  },

  {
    headerName: "Description",
    field: "description",
    sortable: true,
    filter: true,
    editable: true,
    filterParams: {
      showTooltips: true,
    },
    width: 320,
    tooltipField: "description",
  },
  {
    headerName: "Editor status",
    field: "editor_status",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: true,
  },
  {
    headerName: "Exclusive",
    field: "exclusive",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Link Status",
    field: "link_status",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Lock Column",
    field: "lock_column",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Merchant Id",
    field: "merchant_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Network Id",
    field: "network_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Offer Type",
    field: "offer_type",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Pattern Id",
    field: "pattern_id",
    sortable: true,
    filter: true,
    editable: true,
    cellClass: (params: any) => {
      return params.value == 4 ? "!bg-red-500" : "!bg-transparent";
    },
  },
  {
    headerName: "Network Id",
    field: "network_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Raw Description",
    field: "raw_description",
    sortable: true,
    filter: true,
    editable: true,
    filterParams: {
      showTooltips: true,
    },
    width: 320,
    tooltipField: "raw_description",
  },
  {
    headerName: "Raw Title",
    field: "raw_title",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Rejection Reason",
    field: "rejection_reason",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Source",
    field: "source",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Source Coupon Id",
    field: "source_coupon_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Source Id",
    field: "source_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Sourced Times",
    field: "sourced_times",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Source Id",
    field: "source_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Title",
    field: "title",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Status",
    field: "status",
    sortable: true,
    filter: true,
    editable: true,
  },
];
