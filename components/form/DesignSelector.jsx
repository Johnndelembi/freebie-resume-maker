import React, { useContext } from 'react';
import { DesignContext } from '../../contexts/DesignContext';

const DesignSelector = () => {
  const { selectedDesign, setSelectedDesign } = useContext(DesignContext);

  const designs = [
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'elegant', name: 'Elegant' },
  ];

  return (
    <div className="mb-4">
      <h2 className="input-title mb-2">Select Design</h2>
      <div className="grid grid-cols-3 gap-2">
        {designs.map((design) => (
          <button
            key={design.id}
            onClick={() => setSelectedDesign(design.id)}
            className={`p-2 rounded transition-colors ${
              selectedDesign === design.id
                ? 'bg-white text-[rgb(42,167,69)]'
                : 'bg-[rgb(42,167,69)] text-white border border-white'
            }`}
            type="button"
          >
            {design.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesignSelector; 