import Sidebar from "../component/sidebar";
import Preview from "../component/preview";
import Inspector from "../component/inspector";

import { useState } from "react";
import { getSchema } from "../utils/componentRegistry";
import { getDefaultsFromSchema } from "../utils/handleDefaultValue";
import { useLoaderData, Form } from "react-router";
export { loader, action } from "../server/home.server";

export function meta() {
  return [
    { title: "Mini Page Builder" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const loaderData = useLoaderData();
  const sectionsData = loaderData.sections;

  const [sectionsState, setSectionsState] = useState(sectionsData);
  const [activeSection, setActiveSection] = useState(null);
  // Lưu danh sách id các sections đã bị xoá
  // Khi Save → gửi lên action() để xoá khỏi DB
  const [deletedIds, setDeletedIds] = useState([]);

  const handleSelectSection = (section) => {
    setActiveSection(section);
  };

  const handleUpdateSection = (sectionId, newData) => {
    setSectionsState((prev) => {
      return prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            data: {
              ...section.data,
              ...newData,
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
          data: {
            ...prev.data,
            ...newData,
          },
        };
      });
    }
  };

  // handleAddSection
  const handleAddSection = (type) => {
    const schema = getSchema(type);

    const defaults = getDefaultsFromSchema(schema);

    const newSection = {
      id: Date.now(),
      type: type,
      title: schema.title,
      data: defaults,
      isNew: true,
    };

    setSectionsState([...sectionsState, newSection]);

    setActiveSection(newSection);
  };

  // Handler: Đổi thứ tự section khi user kéo thả trong Sidebar
  const handleReorderSection = (oldIndex, newIndex) => {
    // oldIndex: Vị trí BAN ĐẦU của section trước khi kéo
    // newIndex: Vị trí MỚI của section sau khi thả
    setSectionsState((prev) => {
      const newItems = [...prev];

      const removed = newItems.splice(oldIndex, 1)[0];

      newItems.splice(newIndex, 0, removed);
      return newItems;
    });
  };

  // Handler: Xoá section khi user click Delete trong dropdown
  // sectionId: ID của section cần xoá
  const handleDeleteSection = (sectionId) => {
    // Xoá khỏi UI ngay lập tức
    setSectionsState((prev) => prev.filter((s) => s.id !== sectionId));

    // Nếu section đang active bị xoá → reset Inspector
    if (activeSection && activeSection.id === sectionId) {
      setActiveSection(null);
    }

    // Thêm vào danh sách deletedIds để gửi lên server khi Save
    // Chỉ lưu sections đã có trong DB (không phải section mới isNew)
    setDeletedIds((prev) => [...prev, sectionId]);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Top Header Bar */}
      <Form method="post">
        <header className="flex items-center justify-end px-4 py-2 border-b border-gray-200 bg-white">
          <input
            type="hidden"
            name="sections"
            value={JSON.stringify(sectionsState)}
          />
          {/* Gửi kèm deletedIds để action() biết sections nào cần xoá khỏi DB */}
          <input
            type="hidden"
            name="deletedIds"
            value={JSON.stringify(deletedIds)}
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-black hover:bg-gray-800 rounded-md font-medium cursor-pointer"
          >
            Save
          </button>
        </header>
      </Form>
      <section className="flex flex-1 overflow-hidden">
        <Sidebar
          sections={sectionsState}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          onAddSection={handleAddSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
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
