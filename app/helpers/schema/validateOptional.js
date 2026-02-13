/**
 * Validate optional fields
 *
 * Optional fields:
 * - childTypes: array
 * - presets: object
 */

export function validateOptional(config) {
  // Validate childTypes (nếu có)
  if (config.childTypes !== undefined) {
    if (!Array.isArray(config.childTypes)) {
      throw new Error(
        "createSchema: 'childTypes' must be an array in schema '" +
          config.type +
          "'",
      );
    }
  }

  // Validate presets (nếu có)
  if (config.presets !== undefined) {
    if (typeof config.presets !== "object" || config.presets === null) {
      throw new Error(
        "createSchema: 'presets' must be an object in schema '" +
          config.type +
          "'",
      );
    }
  }
}
