export default function Sidebar({ sections, activeSection, onSelectSection }) {
  
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
      <div className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-100 rounded">
        <span className="text-gray-400 ml-4">⋮⋮</span>
        <span className="text-base text-gray-600 border-b border-gray-400">
          Add section
        </span>
      </div>
    </div>
  );
}
