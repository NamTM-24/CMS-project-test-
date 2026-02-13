import { createSchema } from "../../utils/createSchema";

export default function TextBlockSection({ data }) {
  const { heading, content, alignment } = data;

  return (
    <div className="py-12 px-6" style={{ textAlign: alignment }}>
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}

export const schema = createSchema({
  type: "text-block",
  title: "Text Block",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Text Block Heading"
        },
        {
          type: "textarea",
          name: "content",
          label: "Content",
          defaultValue: "Your content here..."
        }
      ]
    }
  ]
});
