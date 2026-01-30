import db from "./connection.js";

// 1.create section
export async function createSection(type, data, parentId, orderIndex) {
  const res = await db.query(
    "INSERT INTO sections (type, data, parent_id, order_index) VALUES (?, ?, ?, ?)",
    [type, JSON.stringify(data), parentId, orderIndex || 0],
  );
  return res[0].insertId;
}

// 2.update section
export async function updateSection(id , data) {
  const res = await db.query(
    "UPDATE sections SET data = ? WHERE id = ?",
    [JSON.stringify(data) , id]
  );

  return res[0].affectedRows > 0; // update success
}

// 3.get all sections (sections parent)
export async function getAllSections() {
  const res = await db.query(
    "SELECT * FROM sections WHERE parent_id IS NULL ORDER BY order_index",
  );
  return res[0];
}

// 4.get children sections
export async function getChildrenSection(parentId) {
  const res = await db.query(
    "SELECT * FROM sections WHERE parent_id = ? ORDER BY order_index",
    [parentId],
  );
  return res[0];
}

// 5. get 1 section
export async function getSectionById(id) {
  const res = await db.query(
    'SELECT * FROM sections WHERE id = ?',
    [id],
  );
  return res[0][0];
}

// 6.delete section
export async function deleteSection(id) {
  const res = await db.query(
    "DELETE FROM sections WHERE id = ?",
    [id]
  );
  return res[0].affectedRows > 0; //notification true/false
}

