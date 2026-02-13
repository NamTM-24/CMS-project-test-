import { validateRequired } from "../helpers/schema/validateRequired.js";
import { validateSettings } from "../helpers/schema/validateSettings.js";
import { validateInputTypes } from "../helpers/schema/validateInputSettings.js";
import { validateOptional } from "../helpers/schema/validateOptional.js";
import { normalizeSchema } from "../helpers/schema/normalizeSchema.js";

export function createSchema(config) {
  const SCHEMA_KEY = ["type", "title", "settings", "childTypes", "presets"];

  // 1. validate fields
  validateRequired(config);

  // 2. validate key
  const configKeys = Object.keys(config); // Trả về mảng key trong object

  for (let i = 0; i < configKeys.length; i++) {
    const key = configKeys[i];

    if (SCHEMA_KEY.indexOf(key) === -1) {
      console.warn(
        "createSchema: Unknown key '" +
          key +
          "' in schema '" +
          config.type +
          "'. " +
          "Allowed keys: " +
          SCHEMA_KEY.join(", "),
      );
    }
  }

  // 3. validate key settings
  validateSettings(config);
  // 4. validate input settings
  validateInputTypes(config);
  // 5. validate optional field
  validateOptional(config);

  // 6. normalize
  const schema = normalizeSchema(config);

  console.log(
    "Schema created: " + schema.title + " (type: " + schema.type + ")",
  );

  return schema;
}
