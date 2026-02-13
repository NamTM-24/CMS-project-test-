import { createSchema } from "../../utils/createSchema";

export default function TestSection({ data }) {
  const {
    textField,
    textareaField,
    numberField,
    colorField,
    selectField,
    switchField,
    rangeField
  } = data;

  return (
    <div className="p-8 border-2 border-dashed border-gray-300">
      <h2 className="text-2xl font-bold mb-4">Test Section</h2>
      <div className="space-y-2 text-sm">
        <p><strong>Text:</strong> {textField}</p>
        <p><strong>Textarea:</strong> {textareaField}</p>
        <p><strong>Number:</strong> {numberField}</p>
        <p><strong>Color:</strong> <span style={{ color: colorField }}>{colorField}</span></p>
        <p><strong>Select:</strong> {selectField}</p>
        <p><strong>Switch:</strong> {switchField ? 'ON' : 'OFF'}</p>
        <p><strong>Range:</strong> {rangeField}</p>
      </div>
    </div>
  );
}

export const schema = createSchema({
  type: "test-section",
  title: "Test Section",
  settings: [
    {
      group: "Text Inputs",
      inputs: [
        {
          type: "text",
          name: "textField",
          label: "Text Field",
          defaultValue: "Sample text"
        },
        {
          type: "textarea",
          name: "textareaField",
          label: "Textarea Field",
          defaultValue: "Sample long text content"
        }
      ]
    },
    {
      group: "Number & Range",
      inputs: [
        {
          type: "number",
          name: "numberField",
          label: "Number Field",
          defaultValue: 42
        },
        {
          type: "range",
          name: "rangeField",
          label: "Range Field",
          defaultValue: 50,
          configs: {
            min: 0,
            max: 100,
            step: 1
          }
        }
      ]
    },
    {
      group: "Selection",
      inputs: [
        {
          type: "color",
          name: "colorField",
          label: "Color Field",
          defaultValue: "#3B82F6"
        },
        {
          type: "select",
          name: "selectField",
          label: "Select Field",
          defaultValue: "option2",
          configs: {
            options: [
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" }
            ]
          }
        },
        {
          type: "switch",
          name: "switchField",
          label: "Switch Field",
          defaultValue: true
        }
      ]
    }
  ]
});
