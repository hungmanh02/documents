import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Database,
  FileText,
  Menu,
  Search,
  StickyNote,
  TextSearchIcon,
  Users,
  X,
} from "lucide-react";
import DocumentHeader from "../../components/Documents/DocumentHeader";

export default function DocumentForm() {
  const [open, setOpen] = useState({
    info: true,
    limit: true,
    file: true,
    option: false,
  });
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);
  const options = ["Số văn bản đi 2025 KV Bình Đông", "Số văn bản đi"];
  const [auto, setAuto] = useState(true);
  const [isNational, setIsNational] = useState(false);
  const toggle = (section) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <DocumentHeader title={"1. Ban hành văn bản"} />
      <div className="px-6 bg-white space-y-5  transition-all overflow-y-auto h-full">
        {/* Header */}

        {/* Section: Thông tin chung */}
        <div className="border rounded-sm overflow-hidden border-slate-300">
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
                    Ngày văn bản <span className="text-red-500">*</span>
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
                    Số ký hiệu <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Ô đầu nhỏ hơn */}
                    <input
                      type="text"
                      disabled={auto}
                      className={`w-24 sm:w-28 md:w-32 border border-slate-300 rounded px-2 py-2 text-sm focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none ${
                        auto ? "bg-slate-100 text-slate-500" : "bg-white"
                      }`}
                    />

                    {/* Dấu / */}
                    <span className="text-slate-500 font-medium">/</span>

                    {/* Ô sau rộng hơn */}
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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Lĩnh vực
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Người ký
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                  />
                </div>
              </div>

              {/* Hàng 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Chức vụ
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Quyền hạn
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                  />
                </div>
              </div>
              {/* Hàng 5: Nơi nhận + toggle */}
              <div className="grid grid-cols-1 gap-4">
                {/* Nơi nhận */}
                <div>
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-slate-700 mt-2">
                      Nơi nhận <span className="text-red-500">*</span>
                    </label>
                    {/* Toggle Đơn vị liên thông */}
                    <div className="flex items-center justify-between md:justify-start gap-3 mb-2">
                      <span className="text-sm text-slate-600">
                        Đơn vị liên thông quốc gia
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isNational}
                          onChange={() => setIsNational(!isNational)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-sky-500 transition"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition"></div>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập tối thiểu 1 ký tự để tìm kiếm"
                      className="flex-1 border border-slate-300 rounded px-3 py-2  text-sm  focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                    />
                    <button className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded flex items-center gap-1 text-sm">
                      <Users className="w-4 h-4" />
                      <span className="hidden sm:inline">Cấu hình đơn vị</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bảng đơn vị nhận */}
              <div className="border border-slate-300 rounded overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-slate-100 text-slate-700 font-medium">
                    <tr>
                      <th className="px-3 py-2 w-14 text-center">STT</th>
                      <th className="px-3 py-2">Mã đơn vị</th>
                      <th className="px-3 py-2">Tên đơn vị</th>
                      <th className="px-3 py-2 text-center w-24">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center text-slate-500 py-3 italic"
                      >
                        Không có dữ liệu
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Hàng 6: Nơi lưu  */}
              <div className="grid grid-cols-1  gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Database className="w-4 h-4 text-slate-500" />
                    Nơi lưu
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded px-3 py-2  text-sm focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                  />
                </div>
              </div>
              {/* Hàng 7: Trích yếu */}
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

              {/* Hàng 8: Ghi chú */}
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

              {/* Hàng 9: Số bản + Số trang */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Số bản
                  </label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Số trang
                  </label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-sky-400 focus:border-sky-400 outline-none"
                  />
                </div>
              </div>
              {/* Hàng 10: Trả lời văn bản */}
              <div className="grid grid-cols-1 gap-4">
                {/* Nơi nhận */}
                <div>
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-slate-700">
                      Trả lời cho văn bản
                    </label>
                    <TextSearchIcon className="text-blue-400 hover:text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Bảng trả lời văn bản */}
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
            <div className="p-5 bg-white border-t space-y-3 border-slate-200">
              <div className="flex items-center gap-4">
                <label className="text-sm text-slate-600 w-32">
                  Hạn xử lý:
                </label>
                <input
                  type="date"
                  className="rounded-lg border border-slate-200 focus:border-indigo-400 focus:ring focus:ring-indigo-100 px-3 py-2 text-sm"
                />
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="accent-indigo-500" />
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
        <div className="flex justify-end gap-3 pb-6">
          <button className="px-5 py-2 rounded-lg text-sm bg-slate-100 hover:bg-slate-200 shadow shadow-slate-400">
            Tạo mới
          </button>
          <button className="px-5 py-2 rounded-lg text-sm bg-indigo-500 text-white hover:bg-indigo-600 shadow shadow-indigo-400">
            Lưu
          </button>
          <button className="px-5 py-2 rounded-lg text-sm bg-green-500 text-white hover:bg-green-600 shadow shadow-emerald-400">
            Phát hành
          </button>
        </div>
      </div>
    </>
  );
}
