/**
 * Validate settings
 *
 * Settings structure:
 * settings: [
 *   {
 *     group: string,
 *     inputs: [
 *       {
 *         type: string,
 *         name: string,
 *         label: string,
 *         defaultValue?: any,
 *         configs?: object
 *       }
 *     ]
 *   },
 *   ...
 * ]
 */

export function validateSettings(config) {
  // Loop qua mảng settings
  for (let i = 0; i < config.settings.length; i++) {  
    const group = config.settings[i];

    // Validate group có 'group' property
    if (!group.group) {
      throw new Error(
        "createSchema: settings[" +
          i +  
          "] missing 'group' property in schema '" +
          config.type +
          "'",
      );
    }

    if (typeof group.group !== "string") {
      throw new Error(
        "createSchema: settings[" +
          i +  
          "].group must be a string in schema '" +
          config.type +
          "'",
      );
    }

    // Validate group có 'inputs' array
    if (!group.inputs) {
      throw new Error(
        "createSchema: settings[" +
          i +  
          "] missing 'inputs' property in schema '" +
          config.type +
          "'",
      );
    }

    if (!Array.isArray(group.inputs)) {
      throw new Error(
        "createSchema: settings[" +
          i +  
          "].inputs must be an array in schema '" +
          config.type +
          "'",
      );
    }

    // Validate từng input trong group
    for (let j = 0; j < group.inputs.length; j++) {  
      const input = group.inputs[j];

      // Required: type
      if (!input.type) {
        throw new Error(
          "createSchema: settings[" +
            i +  
            "].inputs[" +
            j +  
            "] missing 'type' in schema '" +
            config.type +
            "'",
        );
      }

      // Required: name
      if (!input.name) {
        throw new Error(
          "createSchema: settings[" +
            i +  
            "].inputs[" +
            j +  
            "] missing 'name' in schema '" +
            config.type +
            "'",
        );
      }

      // Required: label
      if (!input.label) {
        throw new Error(
          "createSchema: settings[" +
            i +  
            "].inputs[" +
            j +  
            "] missing 'label' in schema '" +
            config.type +
            "'",
        );
      }
    }
  }
}