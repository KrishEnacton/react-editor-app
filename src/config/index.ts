export const config = {
  local_url: "https://eenfeed.enactweb.com/api/editor",
  merchants_endpoint: "/merchants",
  coupons_endpoint: "/coupons",
  coupons_update_endpoint: "/coupon/update",
  fragments_endpoint: "/fragments",
  brands_endpoint: "/brands",
  merchant_info_endpoint: "/merchant/info",
  refragment_coupon_endpoint: "/coupon/reFragment",
  token: "adsi9209-c8ae-4ffer5-bfsf6c-c4c11fafer",
  limitOptions: [
    { label: "10", value: 10 },
    { label: "100", value: 100 },
    { label: "500", value: 500 },
    { label: "1000", value: 1000 },
  ],
  actionButtons: {
    not_published: ["Publish", "Trash"],
    rejected: ["Restore ", "Trash "],
    active: ["Trash"],
    expired: ["Trash"],
    stale: ["Trash"],
    trashed: ["Restore"],
    missing: ["Trash"],
    publish: ["Trash"],
    "not expiry": ["Trash"],
  },
  usersTypeOptions: [
    { label: "Select", value: "" },
    { label: "All", value: "all" },
    { label: "New", value: "new" },
    { label: "Existing", value: "existing" },
  ],
  actionButtonsBody: {
    not_published: {
      publish: {
        className: "!bg-indigo-600",
        body: {
          status: "publish",
          published_at: Date.now(),
        },
      },
      trash: {
        className: "!bg-red-600",
        body: {
          status: "trash",
        },
      },
    },
    rejected: {
      restore: {
        className: "!bg-green-500",
        body: {
          status: "draft",
        },
      },
      trash: {
        className: "!bg-red-600",
        body: {
          status: "trash",
        },
      },
    },
    active: {
      trash: {
        className: "!bg-red-600",
        body: {
          status: "trash",
        },
      },
    },
    expired: {
      trash: {
        className: "!bg-red-600",
        body: {
          status: "trash",
        },
      },
    },
    stale: {
      trash: {
        className: "!bg-red-600",
        body: {
          status: "trash",
        },
      },
    },
    trashed: {
      restore: {
        className: "!bg-green-500",
        body: {
          status: "draft",
        },
      },
    },
    missing: {
      trash: {
        className: "!bg-red-600",
        body: {
          status: "trash",
        },
      },
    },
  },
};
