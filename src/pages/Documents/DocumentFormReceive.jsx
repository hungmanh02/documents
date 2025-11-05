import React, { useRef, useState } from "react";
import {
  X,
  Save,
  FileText,
  Calendar,
  List,
  Tag,
  ChevronsRight,
  Paperclip,
  Upload,
  XCircle,
  Trash2,
  Edit,
  Menu,
  TextSearchIcon,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Database,
  StickyNote,
  Dock,
  DockIcon,
} from "lucide-react";

const DocumentFormReceive = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState({
    info: true,
    limit: true,
    file: true,
    option: false,
  });
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const toggle = (section) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  const options = ["Số văn bản đến 2025 KV Bình Đông", "Số văn bản đến"];
  const [auto, setAuto] = useState(true);
  // State quản lý trạng thái checkbox (Có hạn xử lý)
  const [hasDeadline, setHasDeadline] = useState(false);
  // State quản lý trạng thái checkbox (Có hạn xử lý)
  const [hasDocument, setHasDocument] = useState(false);
  // State quản lý giá trị ngày (Mặc định rỗng)
  const [deadlineDate, setDeadlineDate] = useState("");

  // Class Tailwind mới cho Focus (sky-400)
  const focusStyle =
    "focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none";

  // Class cho input khi bị disabled
  const disabledStyle =
    "bg-slate-50 dark:bg-slate-700/50 dark:text-slate-400 cursor-not-allowed";

  if (!isOpen) return null;

  return (
    // Modal Overlay (Tối ưu để form có thể chiếm màn hình lớn)
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center backdrop-blur-sm">
      {/* Form Container (Tăng kích thước lên max-w-4xl) */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-7xl overflow-hidden transform transition-all">
        {/* Header/Title */}
        <div className="flex items-center justify-between gap-2 text-md text-slate-500 bg-slate-50 border-slate-200 p-4 rounded-t-xl shadow-sm border-b dark:border-slate-700">
          <div className="flex items-center gap-1">
            <span className="flex items-center gap-1">
              <DockIcon className="w-4 h-4 text-slate-400" />
              Documents
            </span>
            <span className="text-slate-400">{">"}</span>
            <span className="text-slate-700 font-medium">
              2. Tiếp nhận văn bản
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* 3 section */}
        <div className="space-y-6 max-h-[90vh] overflow-y-auto p-4">
          {/* Section: Thông tin chung */}
          <div className="border rounded-sm overflow-hidden border-slate-300 ">
            {/* Header */}
            <button
              onClick={() => toggle("info")}
              className="w-full flex justify-between items-center bg-slate-50 px-4 py-3 hover:bg-slate-100 transition"
            >
              <h3 className="font-medium text-slate-700 flex items-center gap-2">
                {open.info ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                Thông tin chung
              </h3>
            </button>

            {/* Body */}
            {open.info && (
              <div className="p-4 space-y-4">
                {/* Hàng 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div ref={inputRef} className="relative flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Loại số <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          setValue(e.target.value);
                          setShow(true);
                        }}
                        onFocus={() => setShow(true)}
                        placeholder="Chọn loại số văn bản..."
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none pr-8"
                      />
                      {value && (
                        <button
                          type="button"
                          onClick={() => setValue("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    {show && (
                      <ul className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded shadow-md max-h-48 overflow-auto text-sm">
                        {options
                          .filter((opt) =>
                            opt.toLowerCase().includes(value.toLowerCase())
                          )
                          .map((opt, i) => (
                            <li
                              key={i}
                              onClick={() => {
                                setValue(opt);
                                setShow(false);
                              }}
                              className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                            >
                              {opt}
                            </li>
                          ))}

                        {options.filter((opt) =>
                          opt.toLowerCase().includes(value.toLowerCase())
                        ).length === 0 && (
                          <li className="px-3 py-2 text-slate-500 italic">
                            Không có dữ liệu
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Ngày đến <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full border border-slate-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none "
                    />
                  </div>
                </div>

                {/* Hàng 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Số đến <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        disabled={auto}
                        className={`flex-1 min-w-[100px] sm:min-w-[150px] border border-slate-300 rounded px-2 py-2 text-sm focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none ${
                          auto ? "bg-slate-100 text-slate-500" : "bg-white"
                        }`}
                      />

                      {/* Checkbox Tự động */}
                      <label className="flex items-center gap-1 text-sm ml-auto cursor-pointer">
                        <input
                          type="checkbox"
                          checked={auto}
                          onChange={() => setAuto(!auto)}
                          className="accent-sky-500"
                        />
                        <span>Tự động</span>
                      </label>
                    </div>
                  </div>
                  {/* Ngày văn bản */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Ngày đến <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full border border-slate-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none "
                    />
                  </div>
                </div>
                {/* Hàng 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Số ký hiệu <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Người tiếp nhận
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                      value={
                        "Trung tâm Y tế khu vực Bình Đông - Sở Y tế - TPHCM"
                      }
                    />
                  </div>
                </div>
                {/* Hàng 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Đơn vị phát hành <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                    />
                  </div>
                  {/* Loại văn bản */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Loại văn bản
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm
               focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none
               appearance-none bg-white cursor-pointer"
                      onClick={() => toggle("option")}
                    >
                      <option value=""></option>
                      <option value={"Giấy mời"}>Giấy mời</option>
                      <option value={"Thư mời"}>Thư mời</option>
                      <option value={"Bản cam kết"}>Bản cam kết</option>
                      <option value={"Bản ghi nhớ"}>Bản ghi nhớ</option>
                      <option value={"Bản sao y bản chính"}>Bản ghi nhớ</option>
                      <option value={"Bản thỏa thuận"}>Bản ghi nhớ</option>
                      <option value={"Bản trích sao"}>Bản ghi nhớ</option>
                      <option value={"Báo cáo"}>Báo cáo</option>
                      <option value={"Biên bản"}>Biên bản</option>
                      <option value={"Chỉ thị"}>Chỉ thị</option>
                      <option value={"Chương trình"}>Chương trình</option>
                      <option value={"Công điện"}>Công điện</option>
                      <option value={"Công văn"}>Công văn</option>
                      <option value={"Đề án"}>Đề án</option>
                      <option value={"Đơn thư"}>Đơn thư</option>
                      <option value={"Dự án"}>Dự án</option>
                      <option value={"Kế hoạch"}>Kế hoạch</option>
                      <option value={"Thông báo"}>Thông báo</option>
                      <option value={"Quyết định"}>Quyết định</option>
                    </select>
                    {!open.option ? (
                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 translate-y-1/3 text-slate-500 pointer-events-none hover:bg-blue-300"
                      />
                    ) : (
                      <ChevronUp
                        size={16}
                        className="absolute right-3 top-1/2 translate-y-1/3 text-slate-500 pointer-events-none hover:bg-blue-300"
                      />
                    )}
                  </div>
                </div>
                {/* Hàng 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Lĩnh vực
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm
               focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none
               appearance-none bg-white cursor-pointer"
                      onClick={() => toggle("option")}
                    >
                      <option value=""></option>
                      <option value={"Giấy mời"}>Giấy mời</option>
                      <option value={"Thư mời"}>Thư mời</option>
                      <option value={"Bản cam kết"}>Bản cam kết</option>
                      <option value={"Bản ghi nhớ"}>Bản ghi nhớ</option>
                      <option value={"Bản sao y bản chính"}>Bản ghi nhớ</option>
                      <option value={"Bản thỏa thuận"}>Bản ghi nhớ</option>
                      <option value={"Bản trích sao"}>Bản ghi nhớ</option>
                      <option value={"Báo cáo"}>Báo cáo</option>
                    </select>
                    {!open.option ? (
                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 translate-y-1/3 text-slate-500 pointer-events-none hover:bg-blue-300"
                      />
                    ) : (
                      <ChevronUp
                        size={16}
                        className="absolute right-3 top-1/2 translate-y-1/3 text-slate-500 pointer-events-none hover:bg-blue-300"
                      />
                    )}
                  </div>
                </div>
                {/* Hàng 5: Trích yếu */}
                <div className="grid grid-cols-1  gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                      <FileText className="w-4 h-4 text-slate-500" />
                      Trích yếu <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="3"
                      className="w-full border border-slate-300 rounded px-3 py-2 resize-none  text-sm focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                    />
                  </div>
                </div>
                {/* Hàng 6: Ghi chú */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <StickyNote className="w-4 h-4 text-slate-500" />
                    Ghi chú
                  </label>
                  <textarea
                    rows="2"
                    className="w-full border border-slate-300 rounded px-3 py-2 resize-none  text-sm focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                  />
                </div>
                {/* Hàng 7: Trả lời văn bản */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Nơi nhận */}
                  <div>
                    <div className="flex justify-between">
                      <label className="block text-sm font-medium text-slate-700">
                        Văn bản trả lời
                      </label>
                      <TextSearchIcon className="text-blue-400 hover:text-blue-500" />
                    </div>
                  </div>
                </div>
                {/* văn bản trả lời */}
                <div className="border border-slate-300 rounded overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-700 font-medium">
                      <tr>
                        <th className="border border-slate-200 py-2 px-3 w-12">
                          STT
                        </th>
                        <th className="border border-slate-200 py-2 px-3 w-40">
                          Số/ký hiệu
                        </th>
                        <th className="border border-slate-200 py-2 px-3 w-40">
                          Ngày phát hành
                        </th>
                        <th className="border border-slate-200 py-2 px-3">
                          Trích yếu
                        </th>
                        <th className="border border-slate-200 py-2 px-3 w-28">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-slate-600 italic py-4 border border-slate-200"
                        >
                          Không có dữ liệu
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Label */}
                <div>
                  <div className="">
                    <label className="text-sm text-slate-600 dark:text-slate-300">
                      Phương thức nhận
                    </label>
                  </div>

                  {/* Input và Checkbox */}
                  <div className="flex items-center gap-4">
                    {/* 1. Input Ngày/Lịch */}
                    <div className="flex w-sm">
                      <input
                        // Sử dụng type="date" để hiển thị lịch chọn ngày
                        type="text"
                        disabled={!hasDocument} // KEY: Disabled khi hasDeadline là false
                        // Áp dụng Styles
                        className={`w-full rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-3 py-2 text-sm 
                            ${focusStyle} 
                            ${!hasDocument ? disabledStyle : ""} 
                            transition-all duration-200`}
                      />
                    </div>

                    {/* 2. Checkbox */}
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasDeadline}
                        onChange={(e) => {
                          setHasDocument(e.target.checked);
                        }}
                        // Accent-sky-400 để khớp với màu focus
                        className="w-4 h-4 text-sky-400 border-slate-300 rounded focus:ring-sky-400 accent-sky-400"
                      />
                      Có tài liệu giấy
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Section: Hạn xử lý */}
          <div className="border rounded-sm overflow-hidden border-slate-300">
            <button
              onClick={() => toggle("limit")}
              className="w-full flex justify-between items-center bg-slate-50 px-4 py-3 hover:bg-slate-100 transition"
            >
              <h3 className="font-medium text-slate-700 flex items-center gap-2">
                {open.limit ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                Thông tin hạn xử lý
              </h3>
            </button>

            {open.limit && (
              <div className="p-5 bg-white dark:bg-slate-800 border-t space-y-3 border-slate-200 dark:border-slate-700 gap-1">
                {/* Label */}
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-300">
                    Hạn xử lý:
                  </label>
                </div>

                {/* Input và Checkbox */}
                <div className="flex items-center gap-4">
                  {/* 1. Input Ngày/Lịch */}
                  <div className="flex w-sm">
                    <input
                      // Sử dụng type="date" để hiển thị lịch chọn ngày
                      type="date"
                      value={deadlineDate}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                      disabled={!hasDeadline} // KEY: Disabled khi hasDeadline là false
                      placeholder="dd/mm/yyyy"
                      // Áp dụng Styles
                      className={`w-full rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-3 py-2 text-sm 
                            ${focusStyle} 
                            ${!hasDeadline ? disabledStyle : ""} 
                            transition-all duration-200`}
                    />
                  </div>

                  {/* 2. Checkbox */}
                  <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasDeadline}
                      onChange={(e) => {
                        setHasDeadline(e.target.checked);
                        // Nếu bỏ chọn, reset giá trị ngày tháng
                        if (!e.target.checked) {
                          setDeadlineDate("");
                        }
                      }}
                      // Accent-sky-400 để khớp với màu focus
                      className="w-4 h-4 text-sky-400 border-slate-300 rounded focus:ring-sky-400 accent-sky-400"
                    />
                    Có hạn xử lý
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Section: File đính kèm */}
          <div className="border rounded-sm overflow-hidden border-slate-300">
            <button
              onClick={() => toggle("file")}
              className="w-full flex justify-between items-center bg-slate-50 px-4 py-3 hover:bg-slate-100 transition"
            >
              <h3 className="font-medium text-slate-700 flex items-center gap-2">
                {open.file ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                Tài liệu đính kèm
              </h3>
            </button>

            {open.file && (
              <div className="p-5 bg-white border-t space-y-4 border-slate-200">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-400 transition">
                  <p className="text-slate-500 text-sm mb-2">
                    Kéo và thả tệp tin (.docx, .pdf, .xls, .zip, ...) vào đây
                  </p>
                  <input type="file" className="hidden" id="fileUpload" />
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Chọn tệp
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button className="px-5 py-2 rounded-lg text-sm bg-indigo-500 text-white hover:bg-indigo-600">
              Lưu
            </button>
            <button className="px-5 py-2 rounded-lg text-sm bg-gray-500 text-white hover:bg-gray-600">
              Trở về
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentFormReceive;
