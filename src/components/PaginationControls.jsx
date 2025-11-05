import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const PaginationControls = ({
  totalItems,
  pageSize,
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  startIndex,
  endIndex,
}) => {
  const pageSizeOptions = [10, 20, 50, 100];

  // Class mới cho nút điều hướng (phẳng hơn và có hover)
  const buttonClass = (disabled, isActive = false) =>
    `p-1.5 transition-colors duration-200 h-8 w-8 flex items-center justify-center 
         ${
           disabled
             ? "text-slate-400 cursor-not-allowed"
             : isActive
             ? "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-medium" // Trang hiện tại (sử dụng nền sáng)
             : "text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
         }`;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-3 py-2 md:px-4 md:py-3 bg-white dark:bg-slate-800 rounded-sm shadow-sm border border-slate-200 dark:border-slate-700">
      {/* 1. KHU VỰC TRÁI: Select Page Size và Thông tin mục */}
      <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 w-full sm:w-auto justify-start order-2 sm:order-1 mt-2 sm:mt-0">
        {/* Select Page Size (Nằm sát thông tin) */}
        <select
          className="p-1 rounded-sm border dark:border-slate-700 dark:bg-slate-200 dark:text-slate-800 text-slate-800 mr-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm appearance-none bg-slate-100" // Cập nhật style để giống input trong hình
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* Hiển thị thông tin */}
        <span>
          Đang hiển thị từ {totalItems > 0 ? startIndex + 1 : 0} đến{" "}
          {Math.min(endIndex, totalItems)} của {totalItems} phần tử
        </span>
      </div>

      {/* 2. KHU VỰC PHẢI: Số trang hiện tại và Các nút điều hướng */}
      <div className="flex items-center space-x-2 sm:space-x-4 order-1 sm:order-2 w-full sm:w-auto justify-center sm:justify-end">
        {/* Hiển thị Trang hiện tại (Căn giữa) */}
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <span>Trang</span>

          {/* Input Số Trang Hiện Tại (Mô phỏng ô Input/Active Page) */}
          <span
            className={buttonClass(false, true)} // Dùng buttonClass với isActive=true để có nền sáng
          >
            {currentPage}
          </span>

          {/* Input Tổng số trang (Mô phỏng chỉ hiển thị số trang cuối) */}
          {/* TẠM THỜI ẨN TRANG TỔNG TRONG MÔ PHỎNG NÀY ĐỂ KHỚP HÌNH */}
        </div>

        {/* Nhóm nút điều hướng */}
        <div className="flex border-none overflow-hidden">
          {/* Nút Về đầu << */}
          <button
            className={`${buttonClass(
              isFirstPage
            )} border-r border-slate-200 dark:border-slate-700 rounded-l-sm`} // Thêm border phải và bo góc trái
            onClick={() => onPageChange(1)}
            disabled={isFirstPage}
            title="Trang đầu"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          {/* Nút Trang trước < */}
          <button
            className={`${buttonClass(
              isFirstPage
            )} border-r border-slate-200 dark:border-slate-700`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isFirstPage}
            title="Trang trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Nút Trang kế tiếp > */}
          <button
            className={`${buttonClass(
              isLastPage
            )} border-r border-slate-200 dark:border-slate-700`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isLastPage}
            title="Trang sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Nút Về cuối >> */}
          <button
            className={`${buttonClass(isLastPage)} rounded-r-sm`} // Bo góc phải
            onClick={() => onPageChange(totalPages)}
            disabled={isLastPage}
            title="Trang cuối"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
