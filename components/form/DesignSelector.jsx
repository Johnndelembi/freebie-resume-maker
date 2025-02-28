import React, { useContext } from 'react';
import { DesignContext } from '../../contexts/DesignContext';
import { FiRefreshCw } from 'react-icons/fi'; // Import refresh icon

const DesignSelector = () => {
  const { selectedDesign, setSelectedDesign } = useContext(DesignContext);

  const designs = [
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'elegant', name: 'Elegant' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'creative', name: 'Creative' },
    { id: 'corporate', name: 'Corporate' },
  ];

  const cycleDesign = () => {
    const currentIndex = designs.findIndex(design => design.id === selectedDesign);
    const nextIndex = (currentIndex + 1) % designs.length;
    setSelectedDesign(designs[nextIndex].id);
  };

  // Find current design name
  const currentDesign = designs.find(design => design.id === selectedDesign);

  return (
    <div className="mb-4">
      <h2 className="input-title mb-2">Design Style</h2>
      <button
        onClick={cycleDesign}
        className="w-full p-3 rounded bg-white text-[rgb(42,167,69)] hover:bg-gray-50 
          transition-all flex items-center justify-between group"
        type="button"
      >
        <span className="font-medium">{currentDesign?.name || 'Modern'}</span>
        <FiRefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default DesignSelector; 