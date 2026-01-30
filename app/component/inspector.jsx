export default function Inspector({ activeSection, onUpdate }) {
  if (!activeSection) {
    return (
      <div className="w-80 h-full border-l border-gray-200 bg-white p-4">
        <p className="text-gray-500 text-center mt-10">
          Select an element and start editing.
        </p>
      </div>
    );
  }
  const { id, type, title, settings } = activeSection;

  const handleChange = (key, value) => {
    onUpdate(id , {[key]: value});
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
        {Object.entries(settings).map(([key, value]) => {
          return (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
