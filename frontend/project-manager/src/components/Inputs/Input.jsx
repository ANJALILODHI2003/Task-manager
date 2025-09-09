import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; 

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4">
      {label && <label className="text-[13px] text-slate-800">{label}</label>}
      <div className="input-box flex items-center border border-gray-300 rounded-md px-3 py-2 mt-1">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)} // send value directly
        />
        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="ml-2 text-slate-400 focus:outline-none"
          >
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
