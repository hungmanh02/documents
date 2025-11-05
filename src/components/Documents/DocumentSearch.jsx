import { Filter, Search } from "lucide-react";
import { useState } from "react";

const DocumentSearch = ({
  initialValue = "",
  placeholder = "Nhập từ khóa tìm kiếm...",
  onSearchChange,
  className,
}) => {
  // 1. Quản lý trạng thái nhập liệu bên trong component này
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);

    // 2. Gọi hàm callback để gửi giá trị lên component cha
    if (onSearchChange) {
      onSearchChange(newValue);
    }
  };
  return (
    <div className={className}>
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border  border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
};

export default DocumentSearch;
