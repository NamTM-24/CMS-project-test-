import { getSchema } from "../utils/componentRegistry";

export default function Inspector({ activeSection, onUpdate }) {
  if (!activeSection || !activeSection.data) {
    return (
      <div className="w-80 h-full border-l border-gray-200 bg-white p-4">
        <p className="text-gray-500 text-center mt-10">
          Select an element and start editing.
        </p>
      </div>
    );
  }
  const { id, type, title, data } = activeSection;
  // get shema 
  const schema = getSchema(type);
  
  const handleChange = (key, value) => {
    onUpdate(id, { [key]: value });
  };
  return (
    <div className="w-80 h-full border-l border-gray-200 bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-gray-500">Type: {type}</p>
      </div>
      {/* Form */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        {/* Loop qua schema.settings */}
        {schema.settings.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Group header */}
            {group.group && (
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {group.group}
              </h3>
            )}
            
            {/* Loop qua inputs trong group */}
            {group.inputs.map((input) => {
              const value = data[input.name];
              
              return (
                <div key={input.name} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {input.label}
                  </label>
                  
                  {/* Render đúng input type */}
                  {renderInput(input, value, handleChange)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}


function renderInput(input, value, handleChange) {
  const { type, name, configs } = input;
  switch (type) {
    case "heading":
      return null; 

    case "text":
      return (
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => handleChange(name, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      );

    case "textarea":
      return (
        <textarea
          value={value ?? ""}
          onChange={(e) => handleChange(name, e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      );

    case "switch":
      return (
        <input
          type="checkbox"
          checked={value ?? false}
          onChange={(e) => handleChange(name, e.target.checked)}
          className="w-4 h-4"
        />
      );

    case "range":
      return (
        <div>
          <input
            type="range"
            value={value ?? configs?.min ?? 0}
            onChange={(e) => handleChange(name, Number(e.target.value))}
            min={configs?.min ?? 0}
            max={configs?.max ?? 100}
            step={configs?.step ?? 1}
            className="w-full"
          />
          <span className="text-sm text-gray-500">
            {value}
            {configs?.unit ?? ""}
          </span>
        </div>
      );

    case "color":
      return (
        <input
          type="color"
          value={value ?? "#000000"}
          onChange={(e) => handleChange(name, e.target.value)}
          className="w-full h-10"
        />
      );

    case "select":
      return (
        <select
          value={value ?? ""}
          onChange={(e) => handleChange(name, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          {configs?.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    default:
      return (
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => handleChange(name, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      );
  }
}
