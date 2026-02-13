import { createSchema } from "../../utils/createSchema";


export default function ImageCardSection({ data }) {
  const { image, cardTitle, cardLink } = data;

  return (
    <a href={cardLink} className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img src={image} alt={cardTitle} className="w-full h-48 object-cover" />
      <p className="p-4 font-medium text-gray-800">{cardTitle}</p>
    </a>
  );
}


export const schema = createSchema({
  type: "image-card",
  title: "Image Card",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "image",
          label: "Image URL",
          defaultValue: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
        },
        {
          type: "text",
          name: "cardTitle",
          label: "Card Title",
          defaultValue: "Product Name"
        },
        {
          type: "text",
          name: "cardLink",
          label: "Card Link",
          defaultValue: "#"
        }
      ]
    }
  ]
});