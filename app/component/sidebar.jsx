import { useState } from "react";
import { getAllSchemas } from "../utils/componentRegistry";

export default function Sidebar({
  sections,
  activeSection,
  onSelectSection,
  onAddSection,
}) {
  // State show modal add sections
  const [showModal, setShowModal] = useState(false);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const availableSchemas = getAllSchemas();
  const handleSelectSchema = (schema) => {
    onAddSection(schema.type);
    setShowModal(false);
  };

  return (
    <div
      className="relative h-full shrink-0 flex flex-col border-r border-gray-200 bg-white"
      style={{ width: "260px", minWidth: "260px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-1 py-3 px-4 border-b border-gray-200">
        <span className="font-medium text-base">Home page</span>
      </div>
      {sections &&
        sections.map((section) => {
          const isActive = activeSection?.id === section.id;

          return (
            <div
              key={section.id}
              className={`flex items-center gap-2 px-2 py-2 rounded cursor-pointer 
                ${isActive ? "bg-blue-100" : "hover:bg-gray-100"}`}
              onClick={() => onSelectSection(section)}
            >
              <span className="text-gray-400">›</span>
              <span className="text-base text-gray-700">{section.title}</span>
            </div>
          );
        })}
      ;{/* Add Section Button */}
      <div
        className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-100 rounded"
        onClick={handleAddClick}
      >
        <span className="text-gray-400 ml-4">⋮⋮</span>
        <span className="text-base text-gray-600 border-b border-gray-400">
          Add section
        </span>
      </div>
      {showModal && (
        <div className="absolute top-16 left-full h-auto max-h-[calc(100%-4rem)] w-80 bg-white shadow-2xl z-50 flex flex-col border border-gray-200 rounded-lg overflow-hidden">
          {/* Search bar với nút X */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              {/* Search input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search sections"
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Nút X */}
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none p-1"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Section title */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-600">
              Theme sections
            </h4>
          </div>

          {/* Sections list */}
          <div className="flex-1 overflow-y-auto">
            {availableSchemas.map((schema) => {
              return (
                <div
                  key={schema.type}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                  onClick={() => handleSelectSchema(schema)}
                >
                  <div className="w-6 h-6 flex items-center justify-center text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-800">{schema.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
