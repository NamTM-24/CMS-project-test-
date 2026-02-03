import Sidebar from "../component/sidebar";
import Preview from "../component/preview";
import Inspector from "../component/inspector";
import { sections } from "../test_data/mockData";
import { useState } from "react";

export function meta() {
  return [
    { title: "Mini Page Builder" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [sectionsState, setSectionsState] = useState(sections);
  const [activeSection, setActiveSection] = useState(null);

  const handleSelectSection = (section) => {
    setActiveSection(section);
  };

  const handleUpdateSection = (sectionId, newSettings) => {
    setSectionsState((prev) => {
      return prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            settings: {
              ...section.settings,
              ...newSettings
            },
          };
        } else {
          return section;
        }
      });
    });

    if (activeSection && activeSection.id === sectionId) {
      setActiveSection((prev) => {
        return {
          ...prev,
          settings: {
            ...prev.settings,
            ...newSettings,
          },
        };
      });
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Top Header Bar */}
      <header className="flex items-center justify-end px-4 py-2 border-b border-gray-200 bg-white">
        <button className="px-4 py-2 text-sm text-white bg-black hover:bg-gray-800 rounded-md font-medium cursor-pointer">
          Save
        </button>
      </header>
      <section className="flex flex-1 overflow-hidden">
        <Sidebar
          sections={sectionsState}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />
        <Preview
          sections={sectionsState}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />
        <Inspector 
          activeSection={activeSection} 
          onUpdate={handleUpdateSection} 
        />
      </section>
    </div>
  );
}