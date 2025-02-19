import React, { useState } from 'react';

const InputComponent = ({ onChange, label, placeholder, type, isRequered, valuee, className }) => {
  const [value, setValue] = useState(valuee || ''); // Default to valuee if provided

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="py-1">
      <label htmlFor={label} className={`mb-2 text-start text-sm font-semibold text-gray-900 ${className} dark:text-white`}>
        {label}
      </label>
      <input
        type={type}
        value={valuee || value} // Use valuee if available, otherwise use internal state
        required={isRequered}
        onChange={handleChange}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2 ${className} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputComponent;
