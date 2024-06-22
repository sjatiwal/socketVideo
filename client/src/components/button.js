import React from "react";

function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-400 px-2 py-1 rounded-[10px] text-white"
    >
      {text}
    </button>
  );
}

export default Button;
