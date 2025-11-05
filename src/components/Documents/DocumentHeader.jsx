import { ClipboardList } from "lucide-react";
import React from "react";

// Đổi tên prop từ menuTitle thành MenuIcon (nhận component icon)
// Thêm prop menuLabel để hiển thị tên menu cha
const DocumentHeader = ({ MenuIcon, menuLabel, subMenuTitle }) => {
  // Đảm bảo các tiêu đề và Icon component được cung cấp
  if (!MenuIcon || !menuLabel || !subMenuTitle) {
    // Fallback nếu thiếu prop
    return (
      <div className="px-6 py-3 text-xl font-bold text-slate-800 dark:text-white">
        {subMenuTitle || "Trang Quản Lý"}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm px-6 py-3 bg-slate-100/20 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      {/* Menu Icon: Sử dụng Icon được truyền vào */}
      <MenuIcon className="w-5 h-5 text-sky-600 dark:text-sky-400" />

      {/* Menu Chính (Cha) */}
      <span className="text-slate-600 dark:text-slate-300 font-medium">
        {menuLabel}
      </span>

      {/* Dấu phân cách */}
      <span className="text-slate-400 dark:text-slate-500">{">"}</span>

      {/* Submenu (Tiêu đề trang hiện tại) */}
      <span className="text-slate-800 dark:text-white font-semibold">
        {subMenuTitle}
      </span>
    </div>
  );
};

export default DocumentHeader;
