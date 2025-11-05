import React, { useEffect, useState } from "react";
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
  DockIcon,
  RefreshCcw,
  Filter,
  Plus,
  Upload,
  Settings,
} from "lucide-react";
import DocumentFormReceive from "./DocumentFormReceive";
import DocumentHeader from "../../components/Documents/DocumentHeader";
import DocumentSearch from "../../components/Documents/DocumentSearch";
import DocumentButton from "../../components/Documents/DocumentButton";
import PaginationControls from "../../components/PaginationControls";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [documentData, setDocumentData] = useState(initialDocumentData);

  // State và Logic Phân trang (Giữ nguyên)
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = documentData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const isDataEmpty = totalItems === 0;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = documentData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const handleOpenForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  // --- LOGIC TẢI DỮ LIỆU (Mô phỏng Refresh) ---
  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDocumentData(initialDocumentData);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleRefresh = () => {
    if (!isLoading) {
      fetchData();
    }
  };

  return (
    // CONTAINER CHÍNH: Layout Responsive. KHÔNG CÓ overflow-y-auto ở đây.
    <div className="space-y-6">
      <DocumentHeader
        MenuIcon={DockIcon}
        menuLabel={"Văn bản"}
        subMenuTitle={"2. Tiếp nhận văn bản"}
      />
      <div className=" flex items-center justify-between gap-2 px-6 h-full">
        <DocumentSearch
          initialValue={searchTerm}
          onSearchChange={setSearchTerm}
          className="w-full h-full"
        />
        <DocumentButton
          width="py-3"
          Icon={RefreshCcw}
          onClick={handleRefresh}
          disabled={isLoading}
          TitleButton="Tải lại dữ liệu"
          classNameIcon={` ${isLoading ? "animate-spin" : ""}`}
        />
        <DocumentButton
          width="py-3"
          Icon={Filter}
          TitleButton="Lọc dữ liệu theo điều kiện"
        />
        <DocumentButton
          className="w-62"
          Icon={Plus}
          TitleName={"Thêm mới văn bản"}
          TitleButton={"Thêm mới văn bản"}
          onClick={handleOpenForm}
        />
      </div>
      <div className="flex flex-col md:px-6 space-y-4 dark:bg-slate-900 w-full min-h-screen ">
        <div className="flex flex-col  dark:bg-slate-800 pb-4">
          <div className="flex justify-end items-center  space-x-3">
            <span className="text-slate-500 dark:text-slate-400 text-sm">
              Tải về:
            </span>
            <button
              className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-200 p-1"
              title="Xuất file"
            >
              <Upload className="w-5 h-5" />
            </button>
            <button
              className="text-slate-500 hover:text-slate-700 p-1"
              title="Cài đặt"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 rounded-md shadow p-2.5 shadow-slate-400">
            <div className="overflow-x-auto bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm shadow-md">
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
                      Ngày đến{" "}
                      <ChevronDown className="w-3 h-3 ml-1 inline-block" />
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
            <PaginationControls
              totalItems={totalItems}
              pageSize={pageSize}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          </div>
        </div>

        {/* 4. COMPONENT FORM NHẬP LIỆU (Được render có điều kiện) */}
        <DocumentFormReceive isOpen={isFormOpen} onClose={handleOpenForm} />
      </div>
    </div>
  );
};

export default DocumentReceivePage;
