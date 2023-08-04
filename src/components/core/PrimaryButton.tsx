import React from "react";
import SpinnerLoader from "./loaders/SpinnerLoader";

export default function PrimaryButton({ label, onClick, loading = false, customClass = "" }: any) {
  return (
    <button
      type="button"
      className={`rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline flex items-center justify-center space-x-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${customClass}`}
      onClick={onClick}
    >
      <span>{label}</span>
      {loading && (
        <span>
          <SpinnerLoader className="!h-5 !w-5" spinnerClass="!h-4 !w-4" />
        </span>
      )}
    </button>
  );
}
