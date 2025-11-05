import React from "react";

const TaskList = () => {
  return (
    <section className="grid grid-cols-2 gap-6">
      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="font-semibold text-gray-700 mb-2">
          Thống kê Task tháng 10
        </h2>
        <div className="text-gray-400 text-sm">[biểu đồ ở đây]</div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="font-semibold text-gray-700 mb-2">
          Công việc sắp đến hạn
        </h2>
        <ul className="text-gray-600 space-y-1">
          <li>- Viết báo cáo ReactJS</li>
          <li>- Thiết kế UI Task App</li>
        </ul>
      </div>
    </section>
  );
};

export default TaskList;
