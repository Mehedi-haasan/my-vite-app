import Remove from "../Icons/Remove";
import Edit from "../Icons/Edit";
import { useState } from "react";

const PracticeCard = ({ product }) => {
  // State to manage checkbox selection
  const [isChecked, setIsChecked] = useState(false);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {/* Checkbox for selecting the row */}
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${product?.id}`} // Unique ID for each product
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={`checkbox-table-search-${product?.id}`} className="sr-only">
            checkbox
          </label>
        </div>
      </td>

      {/* Product Name */}
      <th scope="row" className="pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {product?.name}
      </th>

      {/* Product Category */}
      <td className="px-4 py-4">{product?.category}</td>

      {/* Product Price */}
      <td className="px-4 py-4">{product?.price}</td>

      {/* Product Standard Price */}
      <td className="px-4 py-4">{product?.standard_price}</td>

      {/* Product Quantity */}
      <td className="px-4 py-4">{product?.qty}</td>

      {/* Product Status - Dynamically set based on availability */}
      <td className="px-4 py-4">{product?.status ? "Active" : "Inactive"}</td>

      {/* Product Description - Using dangerouslySetInnerHTML for rich text content */}
      <td className="px-4 py-4" dangerouslySetInnerHTML={{ __html: product?.description }} />

      {/* Edit and Remove Buttons */}
      <td className="pl-4 py-4 pr-5 flex justify-end gap-2 items-center">
        <Edit size="25px" />
        <Remove size="25px" />
      </td>
    </tr>
  );
};

export default PracticeCard;
