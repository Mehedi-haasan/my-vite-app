import React from 'react';

// Functional component for an edit icon
const Edit = ({ size = '20px', color = 'currentColor' }) => {
    // This component renders an SVG element representing an edit icon.

    // Props:
    // - size: A string representing the width and height of the icon (e.g., '20px', '1em'). Defaults to '20px'.
    // - color: A string representing the color of the icon. Defaults to 'currentColor' (inherits text color).

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg" // Standard namespace for SVG
            className='hover:text-red-300 cursor-pointer' // CSS classes for hover effect and cursor style.  Uses Tailwind CSS utility classes.
            width={size} // Sets the width of the SVG.  Uses the size prop.
            height={size} // Sets the height of the SVG. Uses the size prop.
            viewBox="0 0 24 24" // Defines the coordinate system of the SVG for proper scaling.
        >
            {/* Grouping elements for styling */}
            <g 
                fill="none" // No fill for the icon paths
                stroke={color} // Sets the stroke color using the color prop.
                strokeLinecap="round" // Rounded line endings
                strokeLinejoin="round" // Rounded line joins
                strokeWidth="2" // Stroke width
            >
                {/* First path for the edit icon (part of the square and the line) */}
                <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                {/* Second path for the edit icon (the pencil tip) */}
                <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
            </g>
        </svg>
    );
};

export default Edit; // Exports the Edit component