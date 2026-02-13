/**
 *  * MỤC ĐÍCH:
 * - Loop qua tất cả inputs trong settings
 * - Lấy input.defaultValue
 * - Gộp thành 1 object để dễ dùng
 *
 *  * INPUT :
 *   settings: [
 *     {
 *       group: "Content",
 *       inputs: [
 *         { name: "heading", defaultValue: "Welcome" },
 *         { name: "subheading", defaultValue: "New" }
 *       ]
 *     },
 *     {
 *       group: "Design",
 *       inputs: [
 *         { name: "backgroundColor", defaultValue: "#000" }
 *       ]
 *     }
 *   ]
 *
 * OUTPUT :
 *   {
 *     heading: "Welcome",
 *     subheading: "New",
 *     backgroundColor: "#000"
 *   }
 */

export function getDefaultsFromSchema(schema) {
  const defaults = {};
  
  for (let i = 0; i < schema.settings.length; i++) {  
    const group = schema.settings[i];
    
    for (let j = 0; j < group.inputs.length; j++) {
      const input = group.inputs[j];
      
      if (input.defaultValue !== undefined) {
        defaults[input.name] = input.defaultValue;
      }
    }
  }
  
  return defaults;
}
