import { Loader } from "lucide-react";
import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 bg-slate-100/10 dark:bg-slate-900/70 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-xl transition-opacity duration-300">
      {/* Icon Loader xoay vòng */}
      <Loader className="absolute top-1/4  w-8 h-8 text-sky-600 dark:text-sky-400 animate-spin" />
      <p className="mt-9 absolute top-1/4  text-sm font-medium text-slate-700 dark:text-slate-300">
        Đang tải dữ liệu...
      </p>
    </div>
  );
};

export default LoadingOverlay;
