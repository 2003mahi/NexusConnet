import React from 'react';

const DragHandleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
        <path fillRule="evenodd" d="M10 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM5.5 4.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM14.5 4.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM5.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM14.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 14a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM5.5 15.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM14.5 15.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
    </svg>
);

export default DragHandleIcon;