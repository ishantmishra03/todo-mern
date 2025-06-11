import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-90 flex flex-col justify-center items-center z-50">
      <svg
        className="animate-spin h-16 w-16 text-orange-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p className="text-orange-400 text-lg font-semibold">Loading...</p>
    </div>
  );
}
