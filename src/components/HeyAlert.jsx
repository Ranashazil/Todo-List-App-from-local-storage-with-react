import React, { useEffect } from "react";

function HeyAlert({ type, msg, removeAlert, list }) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [list]);

  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs">
      <p
        className={`p-3 rounded-md border-l-4 shadow-md text-sm font-medium ${alertStyles[type] || "bg-gray-100 border-gray-400 text-gray-700"}`}
      >
        {msg}
      </p>
    </div>
  );
}

export default HeyAlert;
