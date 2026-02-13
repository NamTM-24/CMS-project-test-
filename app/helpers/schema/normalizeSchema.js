export function normalizeSchema(config) {
  const normalized = {
    type: config.type,
    title: config.title,
    settings: config.settings,

    // Optional fields
    childTypes: config.childTypes || [],
    presets: config.presets || {},
  };

  // Freeze schema 
  Object.freeze(normalized);
  Object.freeze(normalized.settings);
  Object.freeze(normalized.childTypes);
  Object.freeze(normalized.presets);

  return normalized;
}
