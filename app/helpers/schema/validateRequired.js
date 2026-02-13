/**
 * Validate required schema fields
 * 
 * Required fields:
 * - type: string (unique identifier)
 * - title: string (display name)
 * - settings: array (inspector configuration)
 */
export function validateRequired(config) {
  // Check config exists
  if (!config) {
    throw new Error("createSchema: config is required");
  }
  
  // Validate 'type' field
  if (!config.type) {
    throw new Error("createSchema: Missing required field 'type'");
  }
  
  if (typeof config.type !== "string") {
    throw new Error("createSchema: 'type' must be a string");
  }
  
  // Validate 'title' field
  if (!config.title) {
    throw new Error("createSchema: Missing required field 'title'");
  }
  
  if (typeof config.title !== "string") {
    throw new Error("createSchema: 'title' must be a string");
  }
  
  // Validate 'settings' field
  if (!config.settings) {
    throw new Error("createSchema: Missing required field 'settings'");
  }
  
  if (!Array.isArray(config.settings)) {
    throw new Error("createSchema: 'settings' must be an array");
  }
}