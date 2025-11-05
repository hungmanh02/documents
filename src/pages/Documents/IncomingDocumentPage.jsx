import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  RefreshCcw,
  Settings,
  Upload,
  Eye,
  Trash2,
  ChevronDown,
  Paperclip,
  Menu,
  CheckCircle,
  CornerUpLeft,
  ListTodo,
  LayoutGrid,
  Filter,
  Loader,
  Edit,
  FileText,
  Pen,
  PenBox,
  PenBoxIcon,
  PenIcon,
  PencilIcon,
  PencilOffIcon,
  Pencil,
  PencilRuler,
  PenLine,
  PenTool,
  Pentagon,
  MessageSquareTextIcon,
  DockIcon,
} from "lucide-react";
// IMPORT DỮ LIỆU VÀ HÀM TỪ FILE MỚI
import {
  initialDocumentData,
  getStatusClasses,
} from "../../assets/data/document_utilitie_den";
import PaginationControls from "../../components/PaginationControls";
import DocumentHeader from "../../components/Documents/DocumentHeader";
import DocumentButton from "../../components/Documents/DocumentButton";
import DocumentSearch from "../../components/Documents/DocumentSearch";
import LoadingOverlay from "../../components/LoadingOverlay";

const IncomingDocumentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [documentData, setDocumentData] = useState(initialDocumentData);

  // STATE CHO PHÂN TRANG
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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
  // --------------------------------------------------------

  // --- LOGIC LỌC DỮ LIỆU (Đã đơn giản hóa vì không có nhiều tab trạng thái) ---
  const filteredDocuments = documentData.filter((doc) => {
    const matchesSearch = doc.trichYeu
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch; // Chỉ lọc theo tìm kiếm, Tab tạm thời bị ẩn
  });

  // --- LOGIC PHÂN TRANG VÀ HIỂN THỊ ---
  const totalItems = filteredDocuments.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredDocuments.slice(startIndex, endIndex);

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page) => setCurrentPage(page);

  // Hàm xử lý thay đổi Page Size (Reset về trang 1)
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  // --------------------------------------------------------

  const renderTable = () => (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm shadow-md">
      {/* Bảng chính: table-auto cho phép cột co giãn tốt hơn */}
      <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700 table-auto">
        {/* Header Bảng */}
        <thead className="bg-slate-50 dark:bg-slate-700/50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[50px] border-r border-slate-200 dark:border-slate-600">
              STT
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[50px] border-r border-slate-200 dark:border-slate-600">
              <Paperclip
                className="w-4 h-4 inline-block ml-2 text-slate-400"
                title="Có đính kèm"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[70px] border-r border-slate-200 dark:border-slate-600">
              SỐ ĐẾN <ChevronDown className="w-3 h-3 ml-1 inline-block" />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[130px] border-r border-slate-200 dark:border-slate-600">
              NGÀY TIẾP NHẬN{" "}
              <ChevronDown className="w-3 h-3 ml-1 inline-block" />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[450px] border-r border-slate-200 dark:border-slate-600">
              THÔNG TIN VĂN BẢN
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[120px] border-r border-slate-200 dark:border-slate-600">
              LOẠI NGHIỆP VỤ
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[100px] border-r border-slate-200 dark:border-slate-600">
              TÌNH TRẠNG
            </th>{" "}
            {/* ĐÃ THAY THẾ THỜI HẠN BẰNG TÌNH TRẠNG */}
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
                colSpan="7"
                className="text-center py-12 text-slate-500 dark:text-slate-400 text-lg"
              >
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            currentData.map((doc, index) => (
              <tr
                key={doc.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {/* STT */}
                <td
                  className={`px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300 min-w-[50px] border-r border-slate-200 dark:border-slate-700`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-md   dark:bg-slate-700/50 ">
                      {startIndex + index + 1}
                    </span>
                  </div>
                </td>
                {/* Số lượng file */}
                <td
                  className={` px-4 py-3 text-md font-bold text-center text-slate-700 dark:text-slate-300 min-w-[30px] border-r border-slate-200 dark:border-slate-700`}
                >
                  {doc.hasAttachment && (
                    <span className=" w-6 h-6 text-xs flex items-center justify-center bg-slate-300/50 dark:bg-slate-700/50 rounded-full mb-1">
                      {(doc.hasAttachment && index + 1) || 0}
                    </span>
                  )}
                </td>

                {/* SỐ ĐẾN */}
                <td
                  className={`px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300 min-w-[70px] border-r border-slate-200 dark:border-slate-700`}
                >
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {doc.soDen}
                  </span>
                </td>

                {/* NGÀY TIẾP NHẬN */}
                <td
                  className={`px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300 min-w-[130px] border-r border-slate-200 dark:border-slate-700`}
                >
                  {doc.ngayTiepNhan.split(" ")[0]}
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {doc.ngayTiepNhan.split(" ")[1]}
                  </span>
                </td>

                {/* THÔNG TIN VĂN BẢN (Gộp tất cả thông tin chi tiết) */}
                <td
                  className={`px-4 py-3 text-sm space-y-1 min-w-[450px] border-r border-slate-200 dark:border-slate-700`}
                >
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Số/Ký hiệu:{" "}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {doc.soKyHieu}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ngày văn bản: {doc.ngayVanBan} | Nơi gửi: {doc.noiGui}
                  </p>
                  <p
                    className="text-sm text-slate-800 dark:text-white line-clamp-3"
                    title={doc.trichYeu}
                  >
                    Trích yếu: {doc.trichYeu}
                  </p>
                  {/* Thêm Loại văn bản ở đây, nếu có (theo dữ liệu mẫu) */}
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Loại văn bản: {doc.loaiVanBan || "Công văn"}
                    {doc.hasAttachment && (
                      <Paperclip
                        className="w-4 h-4 inline-block ml-2 text-slate-400"
                        title="Có đính kèm"
                      />
                    )}
                  </p>
                </td>

                {/* LOẠI NGHIỆP VỤ */}
                <td
                  className={`px-4 py-3 text-center min-w-[120px] border-r border-slate-200 dark:border-slate-700`}
                >
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded ${getStatusClasses(
                      doc.loaiNghiepVu
                    )}`}
                  >
                    {doc.loaiNghiepVu}
                  </span>
                </td>

                {/* TÌNH TRẠNG (Mô phỏng cột trống/tình trạng chung) */}
                <td
                  className={`px-4 py-3 text-center min-w-[100px] border-r border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-400`}
                >
                  {doc.tinhTrang || "Đang xử lý"}
                </td>

                {/* THAO TÁC (Edit và File/Text) */}
                <td className="px-4 py-3 min-w-[100px]">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full transition-colors 
                       text-blue-600 border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 "
                      title="Chỉnh sửa"
                    >
                      <PencilIcon className="w-5 h-5 " />
                    </button>
                    <button
                      className="w-8 h-8  flex items-center justify-center rounded-full transition-colors 
                       text-green-600 border border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                      title="Trả lời văn bản"
                    >
                      <MessageSquareTextIcon className="w-5 h-5" />
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
    <div className="relative space-y-6">
      {/* LOADING OVERLAY */}
      {isLoading && <LoadingOverlay />}
      <DocumentHeader
        MenuIcon={DockIcon}
        menuLabel={"Văn bản"}
        subMenuTitle={"4. Sổ văn bản đến"}
      />
      <div className="flex items-center justify-between gap-2 px-6 h-full">
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

      <div className="flex flex-col md:px-6 space-y-4 dark:bg-slate-900 w-full min-h-screen">
        <div className="flex flex-col  dark:bg-slate-800 pb-4">
          {/* TABS VÀ BẢNG DỮ LIỆU */}
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

          {/* Table */}
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

export default IncomingDocumentPage;
