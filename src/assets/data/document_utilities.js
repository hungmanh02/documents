// --- Dữ liệu giả định cho Bảng ---
export const initialDocumentData = [
  // --- 5 MỤC ĐÃ CÓ ---
  {
    id: 1,
    soKyHieu: "360/BC-TTYT",
    ngayVanBan: "03/11/2025",
    trichYeu:
      "Báo cáo công tác Phát ngôn và cung cấp thông tin cho báo chí năm 2025 tại Trung tâm Y tế khu vực Bình Đông",
    loaiVanBan: "Báo cáo",
    ngayPhatHanh: "03/11/2025 14:56:12",
    trangThaiXuLy: "Hoàn thành (1/1)",
    trangThaiPhatHanh: "Đã phát hành",
    loaiNghiepVu: "Văn bản mới",
    hasAttachment: true,
  },
  {
    id: 2,
    soKyHieu: "372/TTYT-TCKT",
    ngayVanBan: "03/11/2025",
    trichYeu:
      "Kính gửi Công văn về việc phê duyệt chi nhập thêm từ số tiền từ nguồn 14",
    loaiVanBan: "Công văn",
    ngayPhatHanh: "03/11/2025 09:50:17",
    trangThaiXuLy: "Khởi tạo (0/1)",
    trangThaiPhatHanh: "Chờ phát hành",
    loaiVanDan: "Công văn",
    loaiNghiepVu: "Văn bản mới",
    hasAttachment: false,
  },
  {
    id: 3,
    soKyHieu: "362/TTYT-TTYT",
    ngayVanBan: "03/11/2025",
    trichYeu:
      "Kính gửi Tờ trình về việc phê duyệt quyết định ban hành Quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức Trung tâm Y tế khu vực Bình Đông trực thuộc Sở Y...",
    loaiVanBan: "Tờ trình",
    ngayPhatHanh: "03/11/2025 09:48:47",
    trangThaiXuLy: "Hoàn thành (1/1)",
    trangThaiPhatHanh: "Đã phát hành",
    loaiNghiepVu: "Văn bản cập nhật",
    hasAttachment: true,
  },
  {
    id: 4,
    soKyHieu: "359/TTYT-KHNV",
    ngayVanBan: "03/11/2025",
    trichYeu:
      "Kính gửi Công văn về việc thông báo của cơ sở điều trị Methadone khi có thay đổi thông tin về tên, địa chỉ, cơ sở vật chất, thiết bị và nhân sự",
    loaiVanBan: "Công văn",
    ngayPhatHanh: "03/11/2025 09:41:56",
    trangThaiXuLy: "Hoàn thành (2/2)",
    trangThaiPhatHanh: "Đã phát hành",
    loaiNghiepVu: "Văn bản mới",
    hasAttachment: false,
  },
  {
    id: 5,
    soKyHieu: "355/BC-TTYT",
    ngayVanBan: "31/10/2025",
    trichYeu: "Báo cáo Hoạt động phòng chống dịch bệnh tháng 10 năm 2025",
    loaiVanBan: "Báo cáo",
    ngayPhatHanh: "31/10/2025 14:25:47",
    trangThaiXuLy: "Hoàn thành (2/2)",
    trangThaiPhatHanh: "Đã phát hành",
    loaiNghiepVu: "Văn bản mới",
    hasAttachment: true,
  },
  // --- 5 MỤC CŨ ĐÃ THÊM VÀO ---
  {
    id: 6,
    soKyHieu: "380/TĐ-BND",
    ngayVanBan: "04/11/2025",
    trichYeu:
      "Tờ trình đề xuất bổ sung kinh phí xây dựng cơ sở hạ tầng công nghệ thông tin",
    loaiVanBan: "Tờ trình",
    ngayPhatHanh: "04/11/2025 10:15:00",
    trangThaiXuLy: "Đang chờ ký (1/2)",
    trangThaiPhatHanh: "Chờ phát hành",
    loaiNghiepVu: "Phê duyệt",
    hasAttachment: true,
  },
  {
    id: 7,
    soKyHieu: "381/CV-DA",
    ngayVanBan: "04/11/2025",
    trichYeu:
      "Công văn thông báo về việc tạm dừng triển khai dự án thử nghiệm hệ thống quản lý nhân sự",
    loaiVanBan: "Công văn",
    ngayPhatHanh: "04/11/2025 11:30:45",
    trangThaiXuLy: "Hoàn thành (1/1)",
    trangThaiPhatHanh: "Đã phát hành",
    loaiNghiepVu: "Thông báo",
    hasAttachment: false,
  },
  {
    id: 8,
    soKyHieu: "382/QĐ-TC",
    ngayVanBan: "04/11/2025",
    trichYeu: "Quyết định về việc điều chỉnh kế hoạch tài chính quý 4 năm 2025",
    loaiVanBan: "Quyết định",
    ngayPhatHanh: "04/11/2025 14:00:00",
    trangThaiXuLy: "Khởi tạo (0/2)",
    trangThaiPhatHanh: "Chờ phát hành",
    loaiNghiepVu: "Tài chính",
    hasAttachment: true,
  },
  {
    id: 9,
    soKyHieu: "383/TB-HC",
    ngayVanBan: "04/11/2025",
    trichYeu:
      "Thông báo về lịch nghỉ lễ và kế hoạch trực ban trong dịp cuối năm",
    loaiVanBan: "Thông báo",
    ngayPhatHanh: "04/11/2025 15:20:10",
    trangThaiXuLy: "Hoàn thành (2/2)",
    trangThaiPhatHanh: "Đã phát hành",
    loaiNghiepVu: "Hành chính",
    hasAttachment: false,
  },
  {
    id: 10,
    soKyHieu: "384/BC-KT",
    ngayVanBan: "04/11/2025",
    trichYeu:
      "Báo cáo tổng kết hoạt động kiểm toán nội bộ trong năm tài khóa 2025",
    loaiVanBan: "Báo cáo",
    ngayPhatHanh: "04/11/2025 16:00:00",
    trangThaiXuLy: "Đang chờ ký (1/3)",
    trangThaiPhatHanh: "Chờ phát hành",
    loaiNghiepVu: "Báo cáo",
    hasAttachment: true,
  },

  // --- 90 MỤC DỮ LIỆU MỚI ĐƯỢC THÊM VÀO ---
  ...Array(90)
    .fill(0)
    .map((_, i) => {
      const id = i + 11;
      const date = `0${(i % 12) + 1}/11/2025`;
      const typeIndex = i % 4;
      const loaiVanBan = ["Quyết định", "Công văn", "Thông báo", "Báo cáo"][
        typeIndex
      ];
      const statusIndex = i % 3;
      const trangThaiPhatHanh = [
        "Đã phát hành",
        "Chờ phát hành",
        "Đã phát hành",
      ][statusIndex];
      const trangThaiXuLy = [
        "Hoàn thành (1/1)",
        "Khởi tạo (0/2)",
        "Đang chờ ký (1/3)",
      ][i % 3];
      const loaiNghiepVu = [
        "Văn bản mới",
        "Phê duyệt",
        "Tài chính",
        "Hành chính",
      ][i % 4];

      return {
        id: id,
        soKyHieu: `00${id}B/CV-CNTT`,
        ngayVanBan: date,
        trichYeu: `Công văn về việc triển khai hệ thống quản lý tài liệu số hóa mới (Mục ${id}). Đây là nội dung dài để kiểm tra việc cắt dòng.`,
        loaiVanBan: loaiVanBan,
        ngayPhatHanh: date + ` 0${(id % 10) + 1}:30:00`,
        trangThaiXuLy: trangThaiXuLy,
        trangThaiPhatHanh: trangThaiPhatHanh,
        loaiNghiepVu: loaiNghiepVu,
        hasAttachment: i % 2 === 0,
      };
    }),
];

// --- Hàm tạo màu sắc cho trạng thái ---
export const getStatusClasses = (status) => {
  switch (status) {
    case "Khởi tạo":
      return "bg-blue-600 text-white";
    case "Hoàn thành":
      return "bg-green-600 text-white";
    case "Đã phát hành":
      return "bg-green-600 text-white";
    case "Chờ phát hành":
      return "bg-yellow-500 text-white";
    case "Văn bản mới":
      return "bg-green-500/80 text-white";
    case "Văn bản cập nhật":
      return "bg-orange-500/80 text-white";
    default:
      return "bg-slate-300 text-slate-700";
  }
};

// --- Hàm Chuẩn hóa Chuỗi (Dùng để lọc Tab) ---
export const normalizeStringForComparison = (str) => {
  if (!str) return "";
  let normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  normalizedStr = normalizedStr.replace(/đ/g, "d").replace(/Đ/g, "D");
  return normalizedStr.replace(/\s+/g, "_").toUpperCase();
};
