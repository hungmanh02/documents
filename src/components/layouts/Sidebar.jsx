import React, { useState } from "react";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  ClipboardList,
  CreditCard,
  DockIcon,
  FileText,
  HelpCircle,
  LayoutDashboard,
  List,
  MessagesSquare,
  Package,
  RotateCw,
  Search,
  Settings,
  ShoppingBag,
  Users,
  Zap,
} from "lucide-react";
const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard, // Hoặc RotateCw nếu muốn icon giống ảnh hơn
    label: "Dashboard",
  },
  // 1. Nhóm Quản lý Văn bản
  {
    id: "documents",
    icon: FileText,
    label: "Văn bản",
    count: "4",
    submenu: [
      { id: "ban_hanh_van_ban", label: "1. Ban hành văn bản" },
      { id: "tiep_nhan_van_ban", label: "2. Tiếp nhận văn bản" },
      { id: "so_van_ban_di", label: "3. Sổ văn bản đi" },
      { id: "so_van_ban_den", label: "4. Sổ văn bản đến" },
    ],
  },
  // 2. Tìm kiếm - Tra cứu dữ liệu
  {
    id: "tra_cuu",
    icon: Search,
    label: "Tìm kiếm - Tra cứu dữ liệu",
    submenu: [
      { id: "tra_cuu_di", label: "Văn bản đi" },
      { id: "tra_cuu_den", label: "Văn bản đến" },
    ],
  },
  // 3. Báo cáo
  {
    id: "bao_cao",
    icon: List, // Hoặc BarChart3
    label: "Báo cáo",
    submenu: [
      { id: "bao_cao_di", label: "Văn bản đi" },
      { id: "bao_cao_den", label: "Văn bản đến" },
    ],
  },
  // 4. Thống kê (Icon RotateCw hoặc Folder)
  {
    id: "thong_ke",
    icon: RotateCw,
    label: "Thống kê",
    submenu: [
      { id: "thong_ke_vb_den", label: "1. Văn bản đến" },
      { id: "thong_ke_vb_di", label: "2. Văn bản đi" },
      { id: "lien_thong_vb", label: "3. Liên thông văn bản" },
      { id: "top_gui_nhan", label: "4. Top gửi/nhận hệ thống" },
      { id: "gui_nhan_thang", label: "5. Gửi/nhận theo tháng" },
    ],
  },
  // 5. Quản trị đơn vị (Settings2 hoặc ClipboardList)
  {
    id: "quan_tri_don_vi",
    icon: ClipboardList,
    label: "Quản trị đơn vị",
    submenu: [
      { id: "cau_hinh_so_vb", label: "Cấu hình sổ văn bản" },
      // Thêm các mục khác nếu cần thiết
    ],
  },
  // 6. Hướng dẫn sử dụng
  {
    id: "huong_dan",
    icon: HelpCircle,
    label: "Hướng dẫn sử dụng",
  },
];
const Sidebar = ({ collapsed, onToggle, currentPage, onPageChange }) => {
  // Logic mở rộng menu con (khởi tạo mở cho Documents)
  const [expandedItems, setExpandedItems] = useState(
    new Set(["documents", "tra_cuu"])
  ); // Mở thêm tra_cuu để dễ kiểm tra

  const toggleExpanded = (itemid) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemid)) {
      newExpanded.delete(itemid);
    } else {
      newExpanded.add(itemid);
    }
    setExpandedItems(newExpanded);
  };

  const isItemActive = (itemId) => currentPage === itemId;
  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      }  transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10 shadow-lg shadow-slate-400 `}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white"></Zap>
          </div>
          {/* Conditional Rendering */}
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-slate-800  dark:text-white">
                Nexus
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Admin panel
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Navigation I will display Dynamic Menus */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id} className="">
            <button
              className={`w-full flex items-center justify-between p-2 rounded-xl transition-all duration-200 
                ${
                  isItemActive(item.id) ||
                  item.submenu?.some((sub) => isItemActive(sub.id))
                    ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              onClick={() => {
                if (item?.submenu) {
                  toggleExpanded(item?.id);
                } else {
                  onPageChange(item?.id);
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <item.icon className={`w-5 h-5`} />
                {/* Conditional Rendering */}
                {!collapsed && (
                  <>
                    <span className="font-medium ">{item.label}</span>
                    {item.badge && (
                      <span className=" flex w-6 h-6  text-sm font-bold text-center items-center justify-center bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="flex w-6 h-6  text-sm font-bold text-center items-center justify-center  bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </div>
              {!collapsed && item.submenu && (
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedItems.has(item.id) ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
            {/* Sub Menus */}
            {!collapsed && expandedItems.has(item.id) && (
              <div className="ml-8 mt-2 space-y-1.5">
                {item?.submenu.map((subitem) => (
                  <button
                    key={subitem.id}
                    className={`w-full text-left pl-4 py-2 pr-2 text-sm rounded-xl transition-all duration-200 flex gap-3 items-center  
                      ${
                        isItemActive(subitem.id)
                          ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25" // Active styles cho submenu
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-800 hover:shadow-lg hover:shadow-slate-500/25 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-r-lg"
                      }`}
                    onClick={() => {
                      onPageChange(subitem.id);
                    }}
                  >
                    {subitem.label}
                    {subitem.count && (
                      <span className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-400 rounded-full">
                        {subitem.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img
              src="https://images.pexels.com/photos/7915359/pexels-photo-7915359.jpeg"
              alt=""
              className="w-10 h-10 rounded-full ring-2 ring-blue-500"
            />
            <div className="flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                  Hùng Mạnh
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
