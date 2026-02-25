import { useState } from "react";
import { getAllSchemas } from "../utils/componentRegistry";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable, useSortable } from "@dnd-kit/react/sortable";

function SortableItem({ section, index, isActive, onSelectSection, onDelete, showMenu, setShowMenu }) {
  const { ref } = useSortable({ id: section.id, index });

  // true nếu menu của chính section này đang mở
  // So sánh showMenu (lưu section.id) với id của section này
  const isMenuOpen = showMenu === section.id;

  return (
    <div
      ref={ref}
      className={`group flex items-center gap-2 px-2 py-2 rounded cursor-pointer relative
        ${isActive ? "bg-blue-100" : "hover:bg-gray-100"}`}
      onClick={() => {
        onSelectSection(section);
        setShowMenu(null); 
      }}
    >
      <span className="text-gray-400">›</span>
      <span className="text-base text-gray-700 flex-1">{section.title}</span>

      <button
        className="opacity-0 group-hover:opacity-100 px-1 text-gray-400 hover:text-gray-700"
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(isMenuOpen ? null : section.id);
        }}
      >
        •••
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded shadow-lg z-10 w-36">
          <button
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(section.id);
              setShowMenu(null);
            }}
          >
             Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  sections,
  activeSection,
  onSelectSection,
  onAddSection,
  onReorder,
  onDelete,  
}) {

  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(null);

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

      <DragDropProvider
        onDragEnd={(event) => {
          // user ấn ESC để huỷ -> ko lam j
          if (event.canceled) {
            return;
          }

          const { source } = event.operation; // Lấy thông tin sections vừa được move

          if (isSortable(source)) {
            // initialIndex: Vị trí BAN ĐẦU trước khi kéo
            // index       : Vị trí SAU KHI thả
            const { initialIndex, index } = source;

            if (initialIndex !== index) {
              onReorder(initialIndex, index);
            }
          }
        }}
      >
        {sections &&
          sections.map((section, index) => (
            <SortableItem
              key={section.id}
              section={section}
              index={index}
              isActive={activeSection?.id === section.id}
              onSelectSection={onSelectSection}
              onDelete={onDelete}
              showMenu={showMenu}       
              setShowMenu={setShowMenu} 
            />
          ))}
      </DragDropProvider>

      {/* Add Section Button */}
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
