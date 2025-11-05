import React from "react";

const DocumentButton = ({
  className,
  Icon,
  TitleName,
  TitleButton,
  width,
  onClick,
  classNameIcon,
}) => {
  return (
    <div className={className}>
      {/*  Quic Action */}
      <button
        onClick={onClick}
        title={TitleButton}
        className={`hidden ${width} md:flex items-center space-x-2 py-2.5 px-4 cursor-pointer bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all `}
      >
        <Icon className={`w-5 h-5 ${classNameIcon}`} />
        {TitleName && <span className="text-md font-medium">{TitleName}</span>}
      </button>
    </div>
  );
};

export default DocumentButton;
