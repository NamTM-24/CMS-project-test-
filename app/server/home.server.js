import {
  getAllSections,
  updateSection,
  createSection,
  deleteSection,
} from "../database/queries";
import { getSchema } from "../utils/componentRegistry";

// loader
export async function loader() {
  try {
    const sections = await getAllSections();
    const data = sections.map((section) => {
      const schema = getSchema(section.type);
      return {
        ...section,
        title: schema ? schema.title : 'loi~'
      }
    });

    return { sections: data };
  } catch (error) {
    console.error(error);
    return { sections: [] };
  }
}
// action
export async function action({ request }) {
  try {
    const formData = await request.formData();
    const sectionsJSON = formData.get("sections");

    if (!sectionsJSON) {
      return { error: "Không có dữ liệu" };
    }

    const sections = JSON.parse(sectionsJSON);

    // Xử lý xoá sections
    // deletedIds: Mảng id các sections đã bị xoá khỏi UI
    const deletedIdsJSON = formData.get("deletedIds");
    const deletedIds = deletedIdsJSON ? JSON.parse(deletedIdsJSON) : [];

    for (let i = 0; i < deletedIds.length; i++) {
      await deleteSection(deletedIds[i]);
    }

    // Xử lý create/update sections
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      if (section.isNew) {
        await createSection(
          section.type,
          section.data,
          section.parent_id || null,
          section.order_index ?? i,
        );
      } else {
        await updateSection(section.id, section.data);
      }
    }

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
