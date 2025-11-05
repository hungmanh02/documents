import React, { useEffect, useState } from "react";
import {
  Plus,
  RefreshCcw,
  Settings,
  Upload,
  ChevronDown,
  Paperclip,
  CornerUpLeft,
  ListTodo,
  LayoutGrid,
  Filter,
  DockIcon,
} from "lucide-react";
import {
  initialDocumentData,
  getStatusClasses,
  normalizeStringForComparison,
} from "../../assets/data/document_utilities";
import DocumentHeader from "../../components/Documents/DocumentHeader";
import DocumentSearch from "../../components/Documents/DocumentSearch";
import DocumentButton from "../../components/Documents/DocumentButton";
import LoadingOverlay from "../../components/LoadingOverlay";
import PaginationControls from "../../components/PaginationControls";

const OutgoingDocumentPage = () => {
  const [activeTab, setActiveTab] = useState("TAT_CA");
  const [searchTerm, setSearchTerm] = useState("");
  const [documentData, setDocumentData] = useState(initialDocumentData);
  const [isLoading, setIsLoading] = useState(false);
  // STATE MỚI CHO PHÂN TRANG
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // --- LOGIC TẢI DỮ LIỆU (Mô phỏng Refresh) ---
  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDocumentData(initialDocumentData);
      setIsLoading(false);
    }, 1500); // 1.5 giây loading
  };

  useEffect(() => {
    fetchData(); // Tải dữ liệu khi mount
  }, []);

  const handleRefresh = () => {
    if (!isLoading) {
      fetchData(); // Gọi hàm tải lại dữ liệu
    }
  };
  // --- Lọc dữ liệu theo Tab ---
  const filteredData = documentData.filter((doc) => {
    // --- 1. Lọc theo Tab (matchesTab) ---

    const targetTabId = activeTab;

    // Chuẩn hóa trạng thái phát hành của văn bản (VD: "CHÒ_PHÁT_HÀNH" -> "CHO_PHAT_HANH")
    const docStatusNormalized = normalizeStringForComparison(
      doc.trangThaiPhatHanh
    );

    // Chuẩn hóa ID của Tab (VD: "DA_PHAT_HANH")
    // Lưu ý: activeTab của bạn có thể đã là format này, nhưng ta chuẩn hóa để an toàn hơn
    const targetStatusNormalized = normalizeStringForComparison(targetTabId);

    // So sánh: Nếu Tab không phải là "TẤT CẢ", thì kiểm tra chuỗi chuẩn hóa có bao gồm trạng thái văn bản không.
    const matchesTab =
      targetTabId === "TAT_CA" ||
      docStatusNormalized.includes(targetStatusNormalized);

    // --- 2. Lọc theo Tìm kiếm (matchesSearch) ---

    // Logic này vẫn giữ nguyên, chỉ đảm bảo searchTerm được lấy từ state
    const matchesSearch = doc.trichYeu
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });
  // --- LOGIC PHÂN TRANG VÀ HIỂN THỊ ---
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page) => setCurrentPage(page);

  // Hàm xử lý thay đổi Page Size (Reset về trang 1)
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  // --- Tab Navigation và Thanh Tìm kiếm ---
  const tabs = [
    { id: "TAT_CA", label: "TẤT CẢ" },
    { id: "CHO_PHAT_HANH", label: "CHỜ PHÁT HÀNH" },
    { id: "DA_PHAT_HANH", label: "ĐÃ PHÁT HÀNH" },
    { id: "DANH_SACH_HUY", label: "DANH SÁCH HỦY" },
  ];

  const renderTabsAndTools = () => (
    <div className="flex flex-col md:flex-row justify-between md:items-end w-full relative">
      {" "}
      {/* Thêm relative */}
      {/* 1. KHU VỰC TABS VÀ CÔNG CỤ (Wrapper Chính) */}
      <div className="flex justify-between items-center w-full">
        {/* 1A. Tab Navigation */}
        {/* Thêm pt-1 để căn chỉnh các tab item khi có gạch chân 2px */}
        <div className="flex   overflow-x-auto  pb-0 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentPage(1);
              }}
              // Lớp CSS cho tab item
              className={`text-md font-medium px-4 pb-4 whitespace-nowrap transition-colors duration-200 
                            ${
                              activeTab === tab.id
                                ? "text-sky-600 dark:text-sky-400 border-b-2 border-sky-600" // Tab Active
                                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white" // Tab Thường
                            }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1B. CÔNG CỤ TẢI VỀ / CÀI ĐẶT (Giữ nguyên) */}
        <div className="flex items-center  text-sm shrink-0 ml-4">
          <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
            Tải về:
          </span>
          <button
            className="text-green-400 hover:text-green-600 dark:text-green-400 dark:hover:text-green-200 p-1"
            title="Xuất file"
          >
            <Upload className="w-5 h-5" />
          </button>
          <button
            className="text-slate-500 dark:text-slate-700 hover:text-slate-700 p-1"
            title="Cài đặt"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* ĐƯỜNG VIỀN MỎNG CHUNG (Áp dụng absolute positioning) */}
      <div className="absolute bottom-0 w-full border-b border-slate-300 dark:border-slate-700"></div>
    </div>
  );

  const renderTable = () => (
    // Container ngoài cùng: Cho phép cuộn ngang (Responsive)
    <div className="overflow-x-auto bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm shadow-md">
      {/* Bảng chính: table-auto cho phép cột co giãn tốt hơn */}
      <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700 table-auto">
        {/* Header Bảng */}
        <thead className="bg-slate-50 dark:bg-slate-700/50">
          <tr>
            {/* THÊM BORDER-R VÀO CÁC CỘT */}
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[50px] border-r border-slate-200 dark:border-slate-600">
              STT
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[50px] border-r border-slate-200 dark:border-slate-600">
              <Paperclip
                className="w-4 h-4 inline-block ml-2 text-slate-400"
                title="Có đính kèm"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[400px] border-r border-slate-200 dark:border-slate-600">
              THÔNG TIN VĂN BẢN
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[150px] flex items-center border-r border-slate-200 dark:border-slate-600">
              Ngày phát hành <ChevronDown className="w-3 h-3 ml-1" />
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[130px] border-r border-slate-200 dark:border-slate-600">
              TRẠNG THÁI XỬ LÝ
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[130px] border-r border-slate-200 dark:border-slate-600">
              TRẠNG THÁI PHÁT HÀNH
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[120px] border-r border-slate-200 dark:border-slate-600">
              LOẠI NGHIỆP VỤ
            </th>
            {/* Cột cuối cùng không có border-r */}
            <th className="px-4 py-3 text-center text-xs font-medium uppercase text-slate-600 dark:text-slate-300 min-w-[110px]">
              THAO TÁC
            </th>
          </tr>
        </thead>

        {/* Body Bảng */}
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {currentData.length === 0 ? (
            <tr>
              {/* <tr> này đã có border ngang tự động từ divide-y, chỉ cần thêm border dọc cho ô này */}
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
                className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" // Border ngang từ divide-y
              >
                {/* STT */}
                <td
                  className={`px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300 min-w-[50px] border-r border-slate-200 dark:border-slate-700`}
                >
                  {index + 1}
                </td>
                {/* Số lượng file */}
                <td
                  className={`px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300 min-w-[30px] border-r border-slate-200 dark:border-slate-700`}
                >
                  {doc.hasAttachment && (
                    <Paperclip
                      className="w-4 h-4 inline-block ml-2 text-slate-400"
                      title="Có đính kèm"
                    />
                  )}
                  {(doc.hasAttachment && index + 1) || 0}
                </td>

                {/* THÔNG TIN VĂN BẢN */}
                <td
                  className={`px-4 py-3 text-sm space-y-1 max-w-[500px] border-r border-slate-200 dark:border-slate-700`}
                >
                  {/* Dữ liệu Ký hiệu và Ngày văn bản */}
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Số/Ký hiệu:{" "}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {doc.soKyHieu}
                    </span>{" "}
                    | Ngày văn bản: {doc.ngayVanBan}{" "}
                  </p>

                  {/* TRÍCH YẾU: Áp dụng rút gọn (line-clamp-2) */}
                  <p
                    className="text-sm text-slate-800 dark:text-white line-clamp-3"
                    title={doc.trichYeu} // Hiển thị đầy đủ khi hover
                  >
                    Trích yếu: {doc.trichYeu}
                  </p>

                  {/* Loại văn bản và File đính kèm */}
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Loại văn bản: {doc.loaiVanBan}
                  </p>
                </td>

                {/* NGÀY PHÁT HÀNH */}
                <td
                  className={`px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300 min-w-[150px] border-r border-slate-200 dark:border-slate-700`}
                >
                  {doc.ngayPhatHanh.split(" ")[0]}
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {doc.ngayPhatHanh.split(" ")[1]}
                  </span>
                </td>

                {/* TRẠNG THÁI XỬ LÝ */}
                <td
                  // Thêm lớp 'text-center' vào thẻ <td> chứa nội dung
                  className={` px-4 py-3 text-center min-w-[130px] border-r border-slate-200 dark:border-slate-700`}
                >
                  {/* Dòng 1: "Hoàn thành" */}
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded  ${getStatusClasses(
                      doc.trangThaiXuLy.split(" ").slice(0, -1).join(" ")
                    )}`}
                  >
                    {doc.trangThaiXuLy.split(" ").slice(0, -1).join(" ")}
                  </span>

                  {/* Dòng 2: "(2/2)" - Đã có 'block' để xuống dòng */}
                  <span className="pl-1 text-xs text-slate-500 dark:text-slate-400">
                    {doc.trangThaiXuLy.split(" ").slice(-1)}
                  </span>
                </td>

                {/* TRẠNG THÁI PHÁT HÀNH */}
                <td
                  className={`px-4 py-3 text-center min-w-[130px] border-r border-slate-200 dark:border-slate-700`}
                >
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${getStatusClasses(
                      doc.trangThaiPhatHanh
                    )}`}
                  >
                    {doc.trangThaiPhatHanh}
                  </span>
                </td>

                {/* LOẠI NGHIỆP VỤ */}
                <td
                  className={`px-4 py-3 text-center min-w-[120px] border-r border-slate-200 dark:border-slate-700`}
                >
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${getStatusClasses(
                      doc.loaiNghiepVu
                    )}`}
                  >
                    {doc.loaiNghiepVu}
                  </span>
                </td>

                {/* THAO TÁC (Không có border-r) */}
                <td className="py-3 min-w-[150px]">
                  <div className="flex items-center justify-center space-x-2">
                    {/* Icon 1: Tải lại/Đồng bộ (Màu Xanh lam) */}
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-full transition-colors 
                       text-blue-600 border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      title="Tải lại/Đồng bộ"
                    >
                      <RefreshCcw className="w-4 h-4" />
                    </button>

                    {/* Icon 2: Trả về/Phản hồi (Màu Xanh lá cây) */}
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-full transition-colors 
                       text-green-600 border border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                      title="Trả về/Phản hồi"
                    >
                      <CornerUpLeft className="w-4 h-4" />
                    </button>

                    {/* Icon 3: Danh sách/Quy trình (Màu Cam) */}
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-full transition-colors 
                       text-orange-500 border border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                      title="Danh sách/Quy trình"
                    >
                      <ListTodo className="w-4 h-4" />
                    </button>

                    {/* Icon 4: Chi tiết/Dạng lưới (Màu Tím) */}
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-full transition-colors 
                       text-purple-600 border border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      title="Chi tiết/Dạng lưới"
                    >
                      <LayoutGrid className="w-4 h-4" />
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
      {isLoading && <LoadingOverlay />}
      <DocumentHeader
        MenuIcon={DockIcon}
        menuLabel={"Văn bản"}
        subMenuTitle={"3. Sổ văn bản đi"}
      />
      {/* {render tool search button */}
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
          className="w-62 "
          Icon={Plus}
          TitleName={"Thêm mới văn bản"}
          width="w-full"
          TitleButton={"Thêm mới văn bản"}
        />
      </div>
      <div className="flex flex-col md:px-6 space-y-4 dark:bg-slate-900 w-full min-h-screen ">
        <div className="flex flex-col  dark:bg-slate-800 pb-4">
          {renderTabsAndTools()}
          <div className="mt-4 rounded-md shadow p-2.5 shadow-slate-400">
            {renderTable()}
            {/* PHẦN PHÂN TRANG MỚI */}
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

export default OutgoingDocumentPage;
