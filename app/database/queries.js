import db from "./connection.js";

/**
 * 1. CREATE SECTION
 * 
 * INPUT:
 *   type: string        - Section type (VD: "hero", "text-block")
 *   data: object        - Section data (VD: { heading: "...", subheading: "..." })
 *   parentId: number    - Parent section ID (null nếu là root section)
 *   orderIndex: number  - Thứ tự hiển thị (0, 1, 2...)
 * 
 * OUTPUT:
 *   number - ID của section vừa tạo (VD: 5)
 * 
 * EXAMPLE:
 *   const newId = await createSection("hero", { heading: "Welcome" }, null, 0);
 *   // → 5
 */
export async function createSection(type, data, parentId, orderIndex) {
  const res = await db.query(
    "INSERT INTO sections (type, data, parent_id, order_index) VALUES (?, ?, ?, ?)",
    [type, JSON.stringify(data), parentId, orderIndex || 0],
  );
  return res[0].insertId;
}

/**
 * 2. UPDATE SECTION
 * 
 * INPUT:
 *   id: number    - Section ID cần update (VD: 3)
 *   data: object  - Data mới (VD: { heading: "Updated Title" })
 * 
 * OUTPUT:
 *   boolean - true nếu update thành công, false nếu không tìm thấy section
 * 
 * EXAMPLE:
 *   const success = await updateSection(3, { heading: "New Heading" });
 *   // → true
 */
export async function updateSection(id , data) {
  const res = await db.query(
    "UPDATE sections SET data = ? WHERE id = ?",
    [JSON.stringify(data) , id]
  );

  return res[0].affectedRows > 0;
}

/**
 * 3. GET ALL SECTIONS (Root sections only)
 * 
 * INPUT: (none)
 * 
 * OUTPUT:
 *   array - Danh sách sections (parent_id = NULL), sorted by order_index
 * 
 * EXAMPLE:
 *   const sections = await getAllSections();
 *   // → [
 *   //   { id: 1, type: "hero", data: {...}, parent_id: null, order_index: 0 },
 *   //   { id: 2, type: "text-block", data: {...}, parent_id: null, order_index: 1 }
 *   // ]
 */
export async function getAllSections() {
  const res = await db.query(
    "SELECT * FROM sections WHERE parent_id IS NULL ORDER BY order_index",
  );
  const rows = res[0];
  const sections = rows.map((section) => {
    return {
      ...section,
      data: section.data,
    };
  });
  return sections;
}

/**
 * 4. GET CHILDREN SECTIONS
 * 
 * INPUT:
 *   parentId: number - Parent section ID (VD: 5)
 * 
 * OUTPUT:
 *   array - Danh sách sections con, sorted by order_index
 * 
 * EXAMPLE:
 *   const children = await getChildrenSection(5);
 *   // → [
 *   //   { id: 6, type: "image-card", data: {...}, parent_id: 5, order_index: 0 },
 *   //   { id: 7, type: "text-block", data: {...}, parent_id: 5, order_index: 1 }
 *   // ]
 */
export async function getChildrenSection(parentId) {
  const res = await db.query(
    "SELECT * FROM sections WHERE parent_id = ? ORDER BY order_index",
    [parentId],
  );
  return res[0];
}

/**
 * 5. GET SECTION BY ID
 * 
 * INPUT:
 *   id: number - Section ID (VD: 3)
 * 
 * OUTPUT:
 *   object - Section object, hoặc undefined nếu không tìm thấy
 * 
 * EXAMPLE:
 *   const section = await getSectionById(3);
 *   // → { id: 3, type: "hero", data: {...}, parent_id: null, order_index: 0 }
 *   // hoặc undefined nếu không tồn tại
 */
export async function getSectionById(id) {
  const res = await db.query(
    'SELECT * FROM sections WHERE id = ?',
    [id],
  );
  return res[0][0];
}

/**
 * 6. DELETE SECTION
 * 
 * INPUT:
 *   id: number - Section ID cần xóa (VD: 3)
 * 
 * OUTPUT:
 *   boolean - true nếu xóa thành công, false nếu không tìm thấy section
 * 
 * EXAMPLE:
 *   const deleted = await deleteSection(3);
 *   // → true
 *    Nếu section có children, cần xóa children trước hoặc set parent_id = NULL
 */
export async function deleteSection(id) {
  const res = await db.query(
    "DELETE FROM sections WHERE id = ?",
    [id]
  );
  return res[0].affectedRows > 0;
}

