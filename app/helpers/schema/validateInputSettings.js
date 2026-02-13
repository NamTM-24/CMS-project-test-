const INPUT_TYPES = [
  "text",
  "textarea",
  "number",
  "color",
  "range",
  "switch",
  "select",
  "image",
  "position",
];

export function validateInputTypes(config) {
  for (let i = 0; i < config.settings.length; i++) {
    const group = config.settings[i];

    // Loop array inputs
    for (let j = 0; j < group.inputs.length; j++) {
      const input = group.inputs[j];

      if (INPUT_TYPES.indexOf(input.type) === -1) { // indexOf() find index in array
        
        console.warn(
          "createSchema: Input type '" +
            input.type +
            "' is not supported in schema '" +
            config.type +
            "'. " +
            "Valid types: " +
            INPUT_TYPES.join(", "),
        );
      }
    }
  }
}
