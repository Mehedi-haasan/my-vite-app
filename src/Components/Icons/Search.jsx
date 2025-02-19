import React from 'react';

// Functional component for a search icon
const Search = ({ className = '', onClick }) => {
    // The component renders an SVG element representing a search icon.

    // Props:
    // - className:  A string for applying CSS classes to the SVG.  Defaults to an empty string.
    // - onClick: A function to be called when the SVG is clicked.

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" // Standard namespace for SVG
            onClick={onClick} // Event handler for click events
            width="22px" // Width of the SVG icon
            height="22px" // Height of the SVG icon
            className={className} // Applies any provided CSS classes
            viewBox="0 0 24 24" // Defines the coordinate system of the SVG.  Important for scaling.
        >
            {/* Path data for the search icon.  This defines the shape. */}
            <path 
                fill="currentColor" // Fills the icon with the current text color.  This is useful for theming.
                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" 
            />
        </svg>
    );
};

export default Search; // Exports the Search component for use in other parts of the application.