/**
 * Dữ liệu mẫu (mock data) cho Sổ văn bản đến.
 * Bao gồm các trường cần thiết để hiển thị đúng theo giao diện chi tiết.
 */
export const initialDocumentData = [
  {
    id: "doc-1",
    soDen: "338", // Số đến
    badgeNumber: 4, // Số nhỏ trong vòng tròn bên cạnh Số đến (theo ảnh)
    ngayTiepNhan: "04/11/2025 13:32:56", // Ngày và giờ tiếp nhận
    soKyHieu: "6315/SYT-KHTC",
    ngayVanBan: "31/10/2025",
    noiGui: "Sở Y Tế",
    trichYeu:
      "V/v đôn đốc thực hiện kê khai giá khám bệnh, chữa bệnh theo yêu cầu trên phần mềm kê khai giá của Sở Y tế.",
    loaiVanBan: "Công văn",
    loaiNghiepVu: "Văn bản mới", // Cột này hiển thị tag màu xanh lá
    tinhTrang: "Đã tiếp nhận", // Dữ liệu cho cột Tình trạng
    hasAttachment: true,
    isUrgent: false,
  },
  {
    id: "doc-2",
    soDen: "337",
    badgeNumber: 2,
    ngayTiepNhan: "04/11/2025 13:32:47",
    soKyHieu: "6380/SYT-TCCB",
    ngayVanBan: "03/11/2025",
    noiGui: "Sở Y Tế",
    trichYeu:
      "(VBKS) Công văn về việc thẩm định hồ sơ nâng lương trước niên hạn năm 2025.",
    loaiVanBan: "Công văn",
    loaiNghiepVu: "Văn bản mới",
    tinhTrang: "Đang xử lý",
    hasAttachment: false,
    isUrgent: true,
  },
  {
    id: "doc-3",
    soDen: "336",
    badgeNumber: 5,
    ngayTiepNhan: "04/11/2025 08:31:27",
    soKyHieu: "6382/SYT-NVY",
    ngayVanBan: "03/11/2025",
    noiGui: "Sở Y Tế",
    trichYeu:
      "V/v sơ kết việc thực hiện Chiến lược Quốc gia về Dinh dưỡng giai đoạn 2021-2030 và tầm nhìn đến năm 2045.",
    loaiVanBan: "Công văn",
    loaiNghiepVu: "Văn bản mới",
    tinhTrang: "Đã phân công",
    hasAttachment: true,
    isUrgent: false,
  },
  // Thêm các dữ liệu mẫu khác để đảm bảo đủ để phân trang
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `doc-${i + 4}`,
    soDen: `${335 - i}`,
    badgeNumber: (i % 3) + 1,
    ngayTiepNhan: `03/11/2025 14:0${i}:00`,
    soKyHieu: `500${i}/UBND-VX`,
    ngayVanBan: `01/11/2025`,
    noiGui: `UBND Tỉnh`,
    trichYeu: `V/v đề xuất điều chỉnh kế hoạch sử dụng đất năm 2025 của huyện ${
      i + 1
    }.`,
    loaiVanBan: i % 2 === 0 ? "Báo cáo" : "Quyết định",
    loaiNghiepVu: i % 3 === 0 ? "Khẩn cấp" : "Văn bản thường",
    tinhTrang: i % 2 === 0 ? "Đã tiếp nhận" : "Đang xử lý",
    hasAttachment: i % 4 === 0,
    isUrgent: i % 5 === 0,
  })),
];

/**
 * Hàm trả về Tailwind classes cho các loại trạng thái/nghiệp vụ khác nhau.
 * @param {string} status - Trạng thái hoặc Loại nghiệp vụ.
 * @returns {string} Tailwind CSS class.
 */
export const getStatusClasses = (status) => {
  const normalizedStatus = normalizeStringForComparison(status);
  switch (normalizedStatus) {
    case "van ban moi":
      return "bg-green-500 text-white dark:bg-green-800 dark:text-green-300 ";
    case "khan cap":
      return "bg-red-500 text-white0 dark:bg-red-800 dark:text-red-300";
    case "van ban thuong":
      return "bg-sky-500 text-white dark:bg-sky-800 dark:text-sky-300";
    case "da tiep nhan":
      return "bg-indigo-500 text-white dark:bg-indigo-800 dark:text-indigo-300";
    case "dang xu ly":
      return "bg-yellow-500 text-white dark:bg-yellow-800 dark:text-yellow-300";
    case "da phan cong":
      return "bg-teal-500 text-white dark:bg-teal-800 dark:text-teal-300";
    default:
      return "bg-slate-500 text-white dark:bg-slate-700 dark:text-slate-300";
  }
};

/**
 * Hàm chuẩn hóa chuỗi để so sánh (loại bỏ dấu và chuyển về chữ thường).
 * @param {string} str - Chuỗi cần chuẩn hóa.
 * @returns {string} Chuỗi đã chuẩn hóa.
 */
export const normalizeStringForComparison = (str) => {
  if (typeof str !== "string") return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};
