import { createSchema } from "../../utils/createSchema";

export default function HeroSection({ data }) {
  const { heading, subheading, paragraph, buttonText, backgroundImage } =
    data;

  return (
    <div
      className="w-full min-h-[400px] flex items-center justify-center bg-cover bg-center "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Content */}
      <div className="text-center text-white p-8">
        <p className="text-sm uppercase tracking-widest mb-2">{subheading}</p>
        <h1 className="text-4xl font-bold mb-4">{heading}</h1>
        <p className="text-lg mb-6">{paragraph}</p>
        <button className="px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-200">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export const schema = createSchema({
  type: "hero",
  title: "Hero Banner",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Welcome to Our Store"
        },
        {
          type: "text",
          name: "subheading",
          label: "Subheading",
          defaultValue: "New Collection"
        },
        {
          type: "textarea",
          name: "paragraph",
          label: "Paragraph",
          defaultValue: "Discover amazing products"
        },
        {
          type: "text",
          name: "buttonText",
          label: "Button Text",
          defaultValue: "Shop Now"
        }
      ]
    }
  ]
});