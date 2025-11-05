import React, { useState } from "react";
import {
  Search,
  Plus,
  RefreshCcw,
  Settings,
  Upload,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  Check,
  X,
  FileText,
  Loader,
  Filter,
  MessageSquareTextIcon,
  PencilIcon,
  ClipboardList,
} from "lucide-react";
import PaginationControls from "../../components/PaginationControls";
import DocumentHeader from "../../components/Documents/DocumentHeader";
import DocumentSearch from "../../components/Documents/DocumentSearch";
import DocumentButton from "../../components/Documents/DocumentButton";
// Giả định các components này đã được import đúng
// import DocumentHeader from "../../components/Documents/DocumentHeader";
// import DocumentSearch from "../../components/Documents/DocumentSearch";
// import PaginationControls from "../../components/PaginationControls";

// --- Dữ liệu giả định cho Bảng Cấu hình Sổ (Dữ liệu cố định) ---
const initialConfigData = [
  {
    id: 1,
    tenBoSo: "Sổ văn bản đi 2025 KV Bình Đông",
    loaiVanBan: "Văn bản đi",
    tuNgay: "17/09/2025",
    denNgay: "31/12/2025",
    giaTriHienTai: 382,
    hoatDong: true,
    hieuLuc: true,
  },
  {
    id: 2,
    tenBoSo: "Sổ văn bản đến 2025 KV Bình Đông",
    loaiVanBan: "Văn bản đến",
    tuNgay: "30/08/2025",
    denNgay: "31/12/2025",
    giaTriHienTai: 346,
    hoatDong: true,
    hieuLuc: true,
  },
  {
    id: 3,
    tenBoSo: "Sổ văn bản đi",
    loaiVanBan: "Văn bản đi",
    tuNgay: "01/01/2025",
    denNgay: "31/12/2025",
    giaTriHienTai: 235,
    hoatDong: true,
    hieuLuc: false,
  },
  {
    id: 4,
    tenBoSo: "Sổ văn bản đến",
    loaiVanBan: "Văn bản đến",
    tuNgay: "01/01/2025",
    denNgay: "31/12/2025",
    giaTriHienTai: 515,
    hoatDong: true,
    hieuLuc: true,
  },
];

// Hàm lấy class cho trạng thái "Hoạt động"
const getActiveStatusClasses = (isActive) => {
  return isActive
    ? "bg-green-100 text-green-700 dark:bg-green-800/50 dark:text-green-400"
    : "bg-red-100 text-red-700 dark:bg-red-800/50 dark:text-red-400";
};

const ConfigurationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [configData, setConfigData] = useState(initialConfigData);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Giả định state loading

  // Logic phân trang và lọc
  const filteredData = configData.filter((item) =>
    item.tenBoSo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentData = filteredData.slice(startIndex, endIndex);

  // Xử lý Pagination (Giả định hàm)
  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Xử lý Refresh (Giả định hàm)
  const handleRefresh = () => {
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  //   const renderToolbar = () => (
  //     // Sử dụng cấu trúc flex để căn chỉnh các phần tử
  //     <div className="flex flex-wrap gap-3 justify-between items-center shrink-0">
  //       {/* Lô tìm kiếm và Refresh */}
  //       <div className="flex items-center space-x-2 w-full md:w-auto shrink-0">
  //         {/* DocumentSearch (Chỉ cần truyền props cần thiết) */}
  //         <div className="w-full sm:w-64">
  //           {/* Giả định DocumentSearch là một input với logic state */}
  //           <input
  //             type="text"
  //             placeholder="Nhập từ khóa tìm kiếm..."
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //             className="w-full p-1.5 border border-slate-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm"
  //           />
  //         </div>

  //         {/* Nút Refresh */}
  //         <button
  //           className="w-10 h-9 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
  //           onClick={handleRefresh}
  //           disabled={isLoading}
  //           title="Làm mới"
  //         >
  //           <RefreshCcw
  //             className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
  //           />
  //         </button>

  //         {/* Nút Tìm kiếm (Căn chỉnh để khớp với hình) */}
  //         <button className="flex items-center px-3 py-1.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition text-sm font-medium whitespace-nowrap">
  //           <Search className="w-4 h-4 mr-1" />
  //           Tìm kiếm
  //         </button>
  //       </div>

  //       {/* Lô Thêm mới và Công cụ */}
  //       <div className="flex items-center space-x-3 flex-none">
  //         <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium whitespace-nowrap">
  //           <Plus className="w-4 h-4 mr-1" />
  //           Thêm mới
  //         </button>
  //         <button
  //           className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 p-1"
  //           title="Tải về/Xuất file"
  //         >
  //           <Upload className="w-5 h-5" />
  //         </button>
  //         <button
  //           className="text-slate-600 hover:text-slate-200 p-1"
  //           title="Cài đặt"
  //         >
  //           <Settings className="w-5 h-5" />
  //         </button>
  //       </div>
  //     </div>
  //   );

  const renderTable = () => (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm shadow">
      <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700 table-auto">
        {/* Header Bảng */}
        <thead className="bg-slate-50 dark:bg-slate-700/50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[50px] border-r border-slate-200 dark:border-slate-600">
              STT
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[250px] border-r border-slate-200 dark:border-slate-600">
              TÊN BỘ SỔ
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[150px] border-r border-slate-200 dark:border-slate-600">
              LOẠI VĂN BẢN
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[120px] border-r border-slate-200 dark:border-slate-600">
              TỪ NGÀY
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[120px] border-r border-slate-200 dark:border-slate-600">
              ĐẾN NGÀY
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[100px] border-r border-slate-200 dark:border-slate-600">
              GIÁ TRỊ HIỆN TẠI
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[100px] border-r border-slate-200 dark:border-slate-600">
              HOẠT ĐỘNG
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[81px] border-r border-slate-200 dark:border-slate-600">
              HIỆU LỰC
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[100px]">
              THAO TÁC
            </th>
          </tr>
        </thead>

        {/* Body Bảng */}
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {currentData.length === 0 ? (
            <tr>
              <td
                colSpan="9"
                className="text-center py-12 text-slate-500 dark:text-slate-400 text-lg"
              >
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            currentData.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {/* STT */}
                <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700">
                  {startIndex + index + 1}
                </td>

                {/* Tên Bộ Sổ */}
                <td className="px-4 py-3 text-sm text-left font-semibold text-slate-800 dark:text-white border-r border-slate-200 dark:border-slate-700">
                  {item.tenBoSo}
                </td>

                {/* Loại Văn Bản */}
                <td className="px-4 py-3 text-sm text-left text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700">
                  {item.loaiVanBan}
                </td>

                {/* Từ Ngày */}
                <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700">
                  {item.tuNgay}
                </td>

                {/* Đến Ngày */}
                <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700">
                  {item.denNgay}
                </td>

                {/* Giá trị Hiện tại */}
                <td className="px-4 py-3 text-sm text-center font-bold text-slate-800 dark:text-white border-r border-slate-200 dark:border-slate-700">
                  {item.giaTriHienTai}
                </td>

                {/* HOẠT ĐỘNG */}
                <td className="px-4 py-3 text-center border-r border-slate-200 dark:border-slate-700">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getActiveStatusClasses(
                      item.hoatDong
                    )}`}
                  >
                    {item.hoatDong ? "Hoạt động" : "Tạm dừng"}
                  </span>
                </td>

                {/* HIỆU LỰC (Icon Check/Edit) */}
                <td className="px-4 py-3 text-center border-r border-slate-200 dark:border-slate-700">
                  {item.hieuLuc ? (
                    <Check
                      className="w-5 h-5 text-green-600 inline-block"
                      title="Có hiệu lực"
                    />
                  ) : (
                    <X
                      className="w-5 h-5 text-red-600 inline-block"
                      title="Không hiệu lực"
                    />
                  )}
                </td>

                {/* THAO TÁC (Edit và Trash) */}
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 p-1"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Xóa"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <DocumentHeader
        menuLabel={"Quản trị đơn vị"}
        subMenuTitle={"Cấu hình sổ văn bản"}
        MenuIcon={ClipboardList}
      />
      <div className="  flex items-center justify-between gap-2 px-6 h-full">
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
        />
      </div>
      <div className="flex flex-col md:px-6 space-y-4 dark:bg-slate-900 w-full min-h-screen ">
        {/* 3. BẢNG DỮ LIỆU */}
        <div className="flex flex-col  dark:bg-slate-800 pb-4">
          {/* TABS VÀ BẢNG DỮ LIỆU */}
          <div className="flex justify-end items-center  space-x-2 ">
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
            {renderTable()}
            {/* PHẦN PHÂN TRANG */}
            <div className="mt-4">
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
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPage;
