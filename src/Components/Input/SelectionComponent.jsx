import React, { useState } from 'react';

const SelectionComponent = ({ options, onSelect, label }) => {
  const [selectedId, setSelectedId] = useState(""); // Default to an empty string for unselected state

  const handleSelect = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedItem = options.find(option => option.id === selectedId); // Find the object
    if (selectedItem) {
      setSelectedId(selectedItem.id);
      onSelect({ id: selectedItem.id, name: selectedItem.name }); // Pass both ID & Name
    }
  };

  return (
    <div className='py-1 w-full'>
      <label htmlFor={label} className="mb-2 text-start text-sm font-semibold text-gray-900 dark:text-white">
        {label}
      </label>
      <select 
        id={label} 
        value={selectedId} 
        onChange={handleSelect}
        className="bg-gray-50 border w-full min-w-[205px] border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:outline-none focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>Select an option</option> {/* Default option */}
        {options.map(({ id, name }) => (
          <option key={id} value={id}> {name} </option>
        ))}
      </select>
    </div>
  );
};

export default SelectionComponent;
