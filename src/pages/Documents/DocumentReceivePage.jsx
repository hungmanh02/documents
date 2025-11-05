import React, { useState } from "react";
import {
  PlusIcon,
  SearchIcon,
  RefreshCcwIcon,
  ChevronDown,
  Menu,
  UploadIcon,
  Settings2,
  CheckCircle,
  XCircle,
  Eye,
  Paperclip,
} from "lucide-react";
import DocumentFormReceive from "./DocumentFormReceive";
// Dữ liệu giả định (Giữ nguyên)
const initialDocumentData = [
  {
    id: 1,
    ngayDen: "20/10/2025",
    thongTin:
      "Quyết định số 123/QD-UBND về việc triển khai dự án công nghệ thông tin cấp tỉnh giai đoạn 2025-2030",
    loaiVanBan: "Quyết định",
    loaiNghiepVu: "Thông báo",
    lyDo: "Khẩn cấp",
    attachmentCount: 3,
  },
  {
    id: 2,
    ngayDen: "21/10/2025",
    thongTin:
      "Công văn số 001/CV-SXD giải trình về các vướng mắc trong hồ sơ đấu thầu xây lắp công trình cầu vượt",
    loaiVanBan: "Công văn",
    loaiNghiepVu: "Giải trình",
    lyDo: "Yêu cầu bổ sung",
    attachmentCount: 0,
  },
  {
    id: 3,
    ngayDen: "22/10/2025",
    thongTin:
      "Thông báo về tuyển dụng nhân sự quý 4 năm 2025 cho các phòng ban trực thuộc",
    loaiVanBan: "Thông báo",
    loaiNghiepVu: "Tuyển dụng",
    lyDo: "Nhu cầu nhân sự",
    attachmentCount: 1,
  },
  // ... (22 mục giả định còn lại để tạo thanh cuộn trang)
  ...Array(22)
    .fill(0)
    .map((_, i) => ({
      id: i + 4,
      ngayDen: `0${(i % 10) + 1}/11/2025`,
      thongTin: `Văn bản thử nghiệm (Test Doc ${
        i + 4
      }): Đây là nội dung dài để kiểm tra tính năng rút gọn (truncate) của bảng.`,
      loaiVanBan: i % 2 === 0 ? "Báo cáo" : "Thông báo",
      loaiNghiepVu: "Nội bộ",
      lyDo: "Thử nghiệm cuộn",
      attachmentCount: i % 4 === 0 ? 4 : 0,
    })),
];

// Định nghĩa chiều rộng cột tối thiểu (KEY cho Responsive Bảng)
const columnWidths = {
  minW_stt: "min-w-[40px]",
  minW_paperclip: "min-w-[40px]",
  minW_ngayDen: "min-w-[100px]",
  minW_thongTin: "min-w-[250px]",
  minW_loaiVanBan: "min-w-[100px]",
  minW_loaiNghiepVu: "min-w-[100px]",
  minW_lyDo: "min-w-[100px]",
  minW_lichSu: "min-w-[50px]",
  minW_thaoTac: "min-w-[100px]",
};

// ----------------------------------------------------------------------
// HÀM TẠO HÀNG BẢNG (TableRow)
// ----------------------------------------------------------------------

const TableRow = ({ data }) => {
  const hasAttachments = data.attachmentCount > 0;

  // Lưu ý: Các thẻ <td> chỉ sử dụng lớp min-w để Responsive
  return (
    <tr className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
      {/* Cột STT */}
      <td
        className={`px-4 py-3 text-sm text-slate-700 dark:text-slate-300 ${columnWidths.minW_stt}`}
      >
        {data.stt}
      </td>

      {/* CỘT FILE ĐÍNH KÈM */}
      <td className={`px-1 py-3 text-center ${columnWidths.minW_paperclip}`}>
        {hasAttachments && (
          <div
            className="relative inline-flex items-center justify-center cursor-pointer"
            title={`Có ${data.attachmentCount} file đính kèm`}
          >
            <Paperclip className="w-4 h-4 text-blue-500" />
            <span className="absolute -top-2 -right-3 h-4 min-w-4 text-xs font-bold bg-red-500 text-white rounded-full flex items-center justify-center p-0.5 leading-none">
              {data.attachmentCount > 9 ? "9+" : data.attachmentCount}
            </span>
          </div>
        )}
      </td>

      {/* CỘT NGÀY ĐẾN */}
      <td
        className={`px-4 py-3 text-sm text-slate-700 dark:text-slate-300 ${columnWidths.minW_ngayDen}`}
      >
        {data.ngayDen}
      </td>

      {/* CỘT THÔNG TIN VĂN BẢN (TRUNCATE) */}
      <td
        className={`px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 ${columnWidths.minW_thongTin}`}
      >
        <div className="truncate" title={data.thongTin}>
          {data.thongTin}
        </div>
      </td>

      {/* CÁC CỘT LOẠI VĂN BẢN, NGHIỆP VỤ, LÝ DO */}
      <td
        className={`px-4 py-3 text-sm text-slate-700 dark:text-slate-300 ${columnWidths.minW_loaiVanBan}`}
      >
        <div className="truncate">{data.loaiVanBan}</div>
      </td>
      <td
        className={`px-4 py-3 text-sm text-slate-700 dark:text-slate-300 ${columnWidths.minW_loaiNghiepVu}`}
      >
        <div className="truncate">{data.loaiNghiepVu}</div>
      </td>
      <td
        className={`px-4 py-3 text-sm text-slate-700 dark:text-slate-300 ${columnWidths.minW_lyDo}`}
      >
        <div className="truncate">{data.lyDo}</div>
      </td>

      {/* CỘT LỊCH SỬ */}
      <td
        className={`px-1 py-3 text-center text-sm ${columnWidths.minW_lichSu}`}
      >
        <button
          title="Xem lịch sử"
          className="p-1 text-slate-500 hover:text-blue-600 dark:text-slate-400"
        >
          <Eye size={16} className="mx-auto" />
        </button>
      </td>

      {/* CỘT THAO TÁC */}
      <td
        className={`px-1 py-3 text-sm space-x-1 flex items-center justify-center ${columnWidths.minW_thaoTac}`}
      >
        <button
          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 p-1"
          title="Chấp nhận"
        >
          <CheckCircle className="w-5 h-5" />
        </button>
        <button
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 p-1"
          title="Từ chối"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

// ----------------------------------------------------------------------
// COMPONENT CHÍNH
// ----------------------------------------------------------------------

const DocumentReceivePage = () => {
  // Thêm state để quản lý trạng thái mở/đóng Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  // State và Logic Phân trang (Giữ nguyên)
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = initialDocumentData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const isDataEmpty = totalItems === 0;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = initialDocumentData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleOpenForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    // CONTAINER CHÍNH: Layout Responsive. KHÔNG CÓ overflow-y-auto ở đây.
    <div className="flex flex-col p-4 md:p-6 space-y-4 dark:bg-slate-900 w-full">
      {/* 1. Breadcrumb (Responsive) */}
      <div className="flex items-center justify-between shrink-0 text-sm text-slate-500 bg-white border border-slate-200/50 rounded-xl shadow-md px-3 py-2 md:px-4 md:py-2 dark:bg-slate-800 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Menu className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Documents</span>
          </span>
          <span className="text-slate-400 hidden sm:inline">{">"}</span>
          <span className="text-slate-700 font-medium dark:text-white">
            2. Tiếp nhận văn bản
          </span>
        </div>
        {/* flex-none: Đảm bảo nhóm này không bị co lại */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-none">
          {/* Tùy chọn (Xuất File & Cài đặt) */}
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-300 space-x-1 md:space-x-2 mr-2 md:mr-4">
            <span className="font-medium hidden sm:inline">Tùy chọn:</span>
            <button
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 p-1"
              title="Xuất File"
            >
              <UploadIcon className="w-5 h-5" />
            </button>
            <button
              className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 p-1"
              title="Tùy chỉnh cột"
            >
              <Settings2 className="w-5 h-5" />
            </button>
          </div>

          {/* Nút Thêm mới (Ẩn nhãn trên mobile) */}
          <button
            className="flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 text-sm"
            title="Thêm mới"
            onClick={handleOpenForm}
          >
            <PlusIcon className="w-4 h-4 mr-1 md:w-5 md:h-5 md:mr-2" />
            <span className="hidden sm:inline">Thêm mới</span>
            <span className="sm:hidden">Thêm</span>
          </button>
        </div>
      </div>

      {/* 2. KHU VỰC BẢNG (Single Table) */}
      {/* KEY RESPONSIVE: overflow-x-auto trên container để cuộn ngang bảng trên mobile */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0">
            <tr>
              {/* Tiêu đề bảng: Sử dụng min-w để đảm bảo Responsive và tránh co quá mức */}
              <th
                className={`px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${columnWidths.minW_stt}`}
              >
                STT
              </th>
              <th
                className={`px-1 py-3 text-center ${columnWidths.minW_paperclip}`}
              >
                <Paperclip size={16} className="mx-auto" />
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${columnWidths.minW_ngayDen}`}
              >
                Ngày đến <ChevronDown className="w-3 h-3 ml-1 inline-block" />
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${columnWidths.minW_thongTin}`}
              >
                Thông tin văn bản
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${columnWidths.minW_loaiVanBan}`}
              >
                Loại văn bản
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${columnWidths.minW_loaiNghiepVu}`}
              >
                Loại nghiệp vụ
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${columnWidths.minW_lyDo}`}
              >
                Lý do
              </th>
              <th
                className={`px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${columnWidths.minW_lichSu}`}
              >
                Lịch sử
              </th>
              <th
                className={`px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${columnWidths.minW_thaoTac}`}
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {isDataEmpty ? (
              <tr>
                <td
                  colSpan="9"
                  className="px-6 py-10 text-center text-lg text-slate-500 dark:text-slate-400"
                >
                  **Không có dữ liệu**
                </td>
              </tr>
            ) : (
              currentData.map((data, index) => (
                <TableRow
                  key={data.id}
                  data={{ ...data, stt: startIndex + index + 1 }}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Phân Trang (Responsive & Logic) */}
      <div className="flex flex-col sm:flex-row justify-between items-center shrink-0 px-3 py-2 md:px-4 md:py-3 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-700/50">
        {/* Thông tin số lượng hàng và Tùy chọn Page Size */}
        <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 w-full sm:w-auto justify-center sm:justify-start order-2 sm:order-1 mt-2 sm:mt-0">
          {/* Select Page Size */}
          <select
            className="p-1 rounded-lg border dark:border-slate-700 dark:bg-slate-700 mr-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // Reset về trang 1 khi đổi kích thước trang
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>

          {/* Hiển thị thông tin */}
          <span>
            Đang hiển thị từ **{startIndex + 1}** đến **
            {Math.min(endIndex, totalItems)}** của **{totalItems}**
          </span>
        </div>

        {/* Các nút điều hướng và Số trang hiện tại */}
        <div className="flex items-center space-x-2 order-1 sm:order-2 w-full sm:w-auto justify-center">
          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Trang **{currentPage}** / **{totalPages}**
          </span>

          {/* Nhóm nút điều hướng */}
          <div className="flex border rounded-lg overflow-hidden dark:border-slate-700">
            {/* Nút Về đầu << */}
            <button
              className={`p-2 border-r dark:border-slate-700 transition 
                    ${
                      currentPage === 1
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                    }`}
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              title="Trang đầu"
            >
              &lt;&lt;
            </button>

            {/* Nút Trang trước < */}
            <button
              className={`p-2 border-r dark:border-slate-700 transition 
                    ${
                      currentPage === 1
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                    }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              title="Trang trước"
            >
              &lt;
            </button>

            {/* Nút Trang kế tiếp > */}
            <button
              className={`p-2 border-r dark:border-slate-700 transition 
                    ${
                      currentPage === totalPages || totalPages === 0
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                    }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              title="Trang sau"
            >
              &gt;
            </button>

            {/* Nút Về cuối >> */}
            <button
              className={`p-2 transition 
                    ${
                      currentPage === totalPages || totalPages === 0
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                    }`}
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              title="Trang cuối"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
      {/* 4. COMPONENT FORM NHẬP LIỆU (Được render có điều kiện) */}
      <DocumentFormReceive isOpen={isFormOpen} onClose={handleOpenForm} />
    </div>
  );
};

export default DocumentReceivePage;
