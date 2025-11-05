import { Dock } from "lucide-react";
import React from "react";

const DocumentHeader = ({ title }) => {
  return (
    <div className="flex items-center gap-2 text-lg px-6 py-3 text-slate-500 bg-slate-50  border-slate-200   shadow-sm shadow-slate-400">
      <span className="flex items-center gap-1">
        <Dock className="w-5 h-5 text-slate-500" />
        Documents
      </span>
      <span className="text-slate-400">{">"}</span>
      <span className="text-slate-700 font-medium">{title}</span>
    </div>
  );
};

export default DocumentHeader;
