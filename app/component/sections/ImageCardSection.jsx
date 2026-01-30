export default function ImageCardSection({ settings }) {
  const { image, cardTitle, cardLink } = settings;

  return (
    <a href={cardLink} className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img src={image} alt={cardTitle} className="w-full h-48 object-cover" />
      <p className="p-4 font-medium text-gray-800">{cardTitle}</p>
    </a>
  );
}
