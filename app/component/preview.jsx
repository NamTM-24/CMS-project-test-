import { register } from "./sections/register";

export default function Preview({ sections, activeSection, onSelectSection }) {
  return (
    <div className="flex h-full min-w-[400px] grow flex-col overflow-hidden">
      {/* Main Preview Container */}
      <div className="flex h-full w-full grow flex-col overflow-hidden p-2.5">
        {/* Card Container */}
        <div className="flex flex-col h-full rounded-md border shadow-sm bg-white">
          {/* Browser Bar */}
          <div
            className="flex gap-3 px-3 py-2 bg-gray-100 rounded-t-md"
            style={{ height: "48px" }}
          >
            {/* URL Bar */}
            <div className="flex grow items-center gap-2 rounded-md px-2.5 py-2 bg-white">
              {/* Globe Icon */}
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              {/* URL Text */}
              <span className="text-sm text-gray-600 truncate">
                http://localhost:5173/
              </span>
            </div>
          </div>

          {/* Preview Content Area */}
          <div className="flex-1 overflow-y-auto bg-white">
            {sections.map((section) => {
              const Component = register[section.type];
              const isActive = activeSection?.id === section.id;
              return (
                <div
                  key={section.id}
                  onClick={() => onSelectSection(section)}
                  className={`cursor-pointer ${isActive ? "border-4 border-blue-500" : ""}`}
                >
                  <Component settings={section.settings} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
